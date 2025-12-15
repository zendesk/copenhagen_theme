export default {
  setItem(key: string, value: string): void {
    return window.localStorage.setItem(key, value);
  },
  getItem(key: string): string | null {
    return window.localStorage.getItem(key);
  },
  removeItem(key: string): void {
    window.localStorage.removeItem(key);
  },
  clear(): void {
    window.localStorage.clear();
  },
};
