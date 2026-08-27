import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { adminProcedure, publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { createMenuItem, deleteMenuItem, getAllMenu, getPublicMenu, getSiteContent, updateMenuItem, upsertSiteContent } from "./db";
import { storagePut } from "./storage";

export const uploadImageInput = z.object({ fileName: z.string().regex(/^[a-zA-Z0-9._-]+$/).max(120), contentType: z.enum(["image/jpeg", "image/png", "image/webp"]), data: z.string().regex(/^data:image\/(jpeg|png|webp);base64,/).max(5500000) });

export const menuInput = z.object({
  name: z.string().min(2).max(160),
  description: z.string().min(2).max(1000),
  priceCents: z.number().int().min(0).max(100000),
  imageUrl: z.string().min(1).max(500),
  sortOrder: z.number().int().min(0).max(999).default(0),
  active: z.number().int().min(0).max(1).default(1),
  category: z.literal("cachorro-quente"),
});

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),
  media: router({
    uploadImage: adminProcedure.input(uploadImageInput).mutation(async ({ input, ctx }) => {
      const base64 = input.data.split(",")[1];
      if (!base64) throw new Error("Imagem inválida");
      const buffer = Buffer.from(base64, "base64");
      if (buffer.length > 4 * 1024 * 1024) throw new Error("A imagem deve ter no máximo 4 MB");
      return storagePut(`ilhadogslz/${ctx.user.id}/${input.fileName}`, buffer, input.contentType);
    }),
  }),
  menu: router({
    publicList: publicProcedure.query(() => getPublicMenu()),
    adminList: adminProcedure.query(() => getAllMenu()),
    create: adminProcedure.input(menuInput).mutation(({ input }) => { const { category: _category, ...data } = input; return createMenuItem(data); }),
    update: adminProcedure.input(menuInput.safeExtend({ id: z.number().int().positive() })).mutation(({ input }) => {
      const { id, category: _category, ...data } = input;
      return updateMenuItem(id, data);
    }),
    remove: adminProcedure.input(z.object({ id: z.number().int().positive() })).mutation(({ input }) => deleteMenuItem(input.id)),
  }),
  content: router({
    publicList: publicProcedure.query(() => getSiteContent()),
    save: adminProcedure.input(z.object({ contentKey: z.string().min(1).max(80), value: z.string().max(5000) })).mutation(({ input }) => upsertSiteContent(input.contentKey, input.value)),
  }),
});

export type AppRouter = typeof appRouter;
