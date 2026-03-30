import { useCallback, useState } from "react";
import localStorage from "../utils/localStorage";

export function useLocalStorage<Value>(
  key: string,
  initialValue: Value,
  version = "v1"
): [Value, (value: Value) => void] {
  const readValue = useCallback(() => {
    try {
      const item = localStorage.getItem(key);
      if (!item) return initialValue;
      const data = JSON.parse(item);
      return data[0] === version ? data[1] : initialValue;
    } catch (error) {
      return initialValue;
    }
  }, [initialValue, key]);

  const [storedValue, setStoredValue] = useState(readValue);

  const setValue = (value: Value) => {
    try {
      setStoredValue(value);
      localStorage.setItem(key, JSON.stringify([version, value]));
    } catch (error) {
      // ignore
    }
  };

  return [storedValue, setValue];
}
