export const vaultService = {
  set: <T>(key: string, value: T): void => localStorage.setItem(key, JSON.stringify(value)),
  get: <T>(key: string): T => JSON.parse(localStorage.getItem(key) as string),
  remove: (key: string): void => localStorage.removeItem(key),
  clear: (): void => localStorage.clear()
}
