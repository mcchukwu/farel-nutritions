export function normalizeNigerianPhone(value: string): string {
  let phone = value.replace(/\D/g, '');

  if (phone.startsWith('0')) {
    phone = `234${phone.slice(1)}`;
  }

  if (!phone.startsWith('234')) {
    phone = `234${phone}`;
  }

  return `+${phone}`;
}
