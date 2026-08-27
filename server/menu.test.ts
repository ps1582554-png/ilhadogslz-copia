import { describe, expect, it, vi } from "vitest";
vi.mock("./storage", () => ({ storagePut: vi.fn(async () => ({ key: "ilhadogslz/1/dog.jpg", url: "/manus-storage/dog.jpg" })) }));
import { appRouter, menuInput, uploadImageInput } from "./routers";
import type { TrpcContext } from "./_core/context";
import { storagePut } from "./storage";

const baseContext = (role: "admin" | "user"): TrpcContext => ({
  user: { id: 1, openId: "tester", email: "test@example.com", name: "Tester", loginMethod: "test", role, createdAt: new Date(), updatedAt: new Date(), lastSignedIn: new Date() },
  req: {} as TrpcContext["req"],
  res: {} as TrpcContext["res"],
});

describe("menu access policy", () => {
  it("exposes only the public menu query without requiring login", async () => {
    const caller = appRouter.createCaller({ ...baseContext("user"), user: undefined });
    expect(caller.menu.publicList).toBeDefined();
  });
  it("does not allow a regular user to access the admin menu query", async () => {
    const caller = appRouter.createCaller(baseContext("user"));
    await expect(caller.menu.adminList()).rejects.toMatchObject({ code: "FORBIDDEN" });
  });
  it("validates image uploads and rejects unsupported files", () => {
    expect(uploadImageInput.safeParse({ fileName: "dog.jpg", contentType: "image/jpeg", data: "data:image/jpeg;base64,aGVsbG8=" }).success).toBe(true);
    expect(uploadImageInput.safeParse({ fileName: "dog.exe", contentType: "image/png", data: "data:application/octet-stream;base64,aGVsbG8=" }).success).toBe(false);
  });
  it("protects create and update mutations and rejects invalid categories", async () => {
    const userCaller = appRouter.createCaller(baseContext("user"));
    const item = { name: "Hot Dog Teste", description: "Cachorro-quente", priceCents: 2000, imageUrl: "/dog.jpg", sortOrder: 1, active: 1, category: "cachorro-quente" as const };
    await expect(userCaller.menu.create(item)).rejects.toMatchObject({ code: "FORBIDDEN" });
    await expect(userCaller.menu.update({ ...item, id: 1 })).rejects.toMatchObject({ code: "FORBIDDEN" });
    const adminCaller = appRouter.createCaller(baseContext("admin"));
    await expect(adminCaller.menu.create({ ...item, category: "batata" as never })).rejects.toMatchObject({ code: "BAD_REQUEST" });
    await expect(adminCaller.menu.update({ ...item, id: 1, category: "batata" as never })).rejects.toMatchObject({ code: "BAD_REQUEST" });
  });
  it("protects upload and returns a stored image URL for an admin", async () => {
    const userCaller = appRouter.createCaller(baseContext("user"));
    const payload = { fileName: "dog.jpg", contentType: "image/jpeg" as const, data: "data:image/jpeg;base64,aGVsbG8=" };
    await expect(userCaller.media.uploadImage(payload)).rejects.toMatchObject({ code: "FORBIDDEN" });
    const adminCaller = appRouter.createCaller(baseContext("admin"));
    const result = await adminCaller.media.uploadImage(payload);
    expect(result.url).toBe("/manus-storage/dog.jpg");
    expect(storagePut).toHaveBeenCalled();
  });
  it("rejects products outside the hot-dog-only policy", () => {
    const valid = menuInput.safeParse({ name: "Hot Dog Anil", description: "Cachorro-quente artesanal", priceCents: 2500, imageUrl: "/manus-storage/dog.jpg", sortOrder: 1, active: 1, category: "cachorro-quente" });
    const invalid = menuInput.safeParse({ name: "Batata frita", description: "Porção crocante", priceCents: 1500, imageUrl: "/manus-storage/fries.jpg", sortOrder: 1, active: 1, category: "batata" });
    expect(valid.success).toBe(true);
    expect(invalid.success).toBe(false);
  });
});
