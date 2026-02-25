export function load<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : fallback;
}

export function save<T>(key: string, data: T) {
  localStorage.setItem(key, JSON.stringify(data));
}
