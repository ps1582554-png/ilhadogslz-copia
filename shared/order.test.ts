import { describe, expect, it } from "vitest";
import { buildWhatsAppLink, WHATSAPP_PHONE } from "./order";

describe("WhatsApp ordering link", () => {
  it("uses the IlhaDogSLZ phone number and encodes the product message", () => {
    const link = buildWhatsAppLink("Hot Dog Anil");
    expect(WHATSAPP_PHONE).toBe("5598984042852");
    expect(link).toContain("api.whatsapp.com/send?phone=5598984042852");
    expect(link).toContain(encodeURIComponent("Olá, IlhaDogSLZ! Quero pedir o Hot Dog Anil."));
  });
});
