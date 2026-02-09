export function pickWeighted<T extends { weight: number }>(items: T[]): T | null {
  if (items.length === 0) {
    return null;
  }
  const total = items.reduce((acc, item) => acc + item.weight, 0);
  const r = Math.random() * total;
  let acc = 0;
  for (const item of items) {
    acc += item.weight;
    if (r <= acc) {
      return item;
    }
  }
  return items[items.length - 1] ?? null;
}
