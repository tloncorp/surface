import { useCallback, useEffect, useRef, useState } from "react";

/**
 * A simple persistence mechanism that uses `localStorage` to store a value and
 * keep it in sync across tabs.
 *
 * Important to note is that the `storage` event is only fired when the value is
 * changed from a different tab, not the current tab.
 */
const useSyncedStorage = <T>(
  key: string,
  defaultValue: T
): [T, (newValue: T) => void] => {
  const defaultRef = useRef<T>(defaultValue);
  defaultRef.current = defaultValue;

  const [localValue, setLocalValue] = useState<T>(() =>
    loadJsonFromStorage(key, defaultValue)
  );

  const setValue = useCallback(
    (newValue: T) => {
      setLocalValue(newValue);
      localStorage.setItem(key, JSON.stringify(newValue));
    },
    [key]
  );

  useEffect(() => {
    const handleStorageChange = () => {
      setLocalValue(loadJsonFromStorage(key, defaultRef.current));
    };
    window.addEventListener("storage", handleStorageChange);
    () => window.removeEventListener("storage", handleStorageChange);
  }, [key]);

  return [localValue, setValue];
};

const loadJsonFromStorage = <T>(key: string, defaultValue: T): T => {
  return JSON.parse(localStorage.getItem(key) ?? "null") ?? defaultValue;
};

export default useSyncedStorage;
