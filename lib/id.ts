// Simple client-side ID helper. Good enough for a single-user MVP.
export function createId(prefix?: string): string {
  const random = Math.random().toString(36).slice(2, 8);
  const time = Date.now().toString(36);
  return prefix ? `${prefix}_${time}_${random}` : `${time}_${random}`;
}

