export function excludeKeys<T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): Omit<T, K> {
  return (Object.entries(obj) as [keyof T, T[keyof T]][])
    .filter(([k]) => !keys.includes(k as K))
    .reduce((acc, [k, v]) => {
      // @ts-expect-error narrowing
      acc[k] = v;
      return acc;
    }, {} as Omit<T, K>);
}
