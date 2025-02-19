type StorageValue = string | number | boolean | object | bigint;

export function localStorageGet(name: string, defaultValue: unknown = ''): StorageValue {
  const valueFromStore = localStorage.getItem(name);
  if (valueFromStore === null) return defaultValue as StorageValue;

  try {
    const jsonParsed = JSON.parse(valueFromStore);
    if (['string', 'number', 'boolean', 'boolean', 'bigint', 'object'].includes(typeof jsonParsed)) {
      return jsonParsed;
    }
  } catch (error) {}

  return valueFromStore;
}

export function localStorageSet(name: string, value: unknown) {
  if (typeof value === 'undefined') {
    return;
  }
  let valueAsString: string;
  if (typeof value === 'object') {
    valueAsString = JSON.stringify(value);
  } else {
    valueAsString = String(value);
  }

  localStorage.setItem(name, valueAsString);
}

export function localStorageDelete(name: string) {
  if (name) {
    localStorage.removeItem(name);
  } else {
    localStorage.clear();
  }
}
