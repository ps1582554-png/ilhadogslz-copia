export const WHATSAPP_PHONE = "5598984042852";

export function buildWhatsAppLink(itemName?: string) {
  const message = itemName ? `Olá, IlhaDogSLZ! Quero pedir o ${itemName}.` : "Olá, IlhaDogSLZ! Quero fazer um pedido.";
  return `https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE}&text=${encodeURIComponent(message)}`;
}
