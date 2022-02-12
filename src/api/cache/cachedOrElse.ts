import apiCache from "./apiCache";

export default async function cachedOrElse<T>(key: string, elseFn: () => Promise<T>): Promise<T> {
  const cached = apiCache.get(key);
  if (cached && process.env.NODE_ENV !== "development") return cached as T;
  const elseVal = await elseFn();
  apiCache.set(key, elseVal);
  return elseVal;
}
