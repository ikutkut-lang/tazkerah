// Local Storage persistence utilities for real-time auto-saving

export function loadSavedState<T>(key: string, defaultValue: T): T {
  try {
    const saved = localStorage.getItem(`tanweer_${key}`);
    if (saved !== null) {
      return JSON.parse(saved) as T;
    }
  } catch (err) {
    console.warn(`Error loading state for key ${key}:`, err);
  }
  return defaultValue;
}

export function saveState<T>(key: string, value: T): void {
  try {
    localStorage.setItem(`tanweer_${key}`, JSON.stringify(value));
  } catch (err) {
    console.warn(`Error saving state for key ${key}:`, err);
  }
}
