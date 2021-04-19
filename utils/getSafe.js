export default function getSafe(fn, defaultValue) {
  try {
    return fn() || fn() === "" || fn() === 0 ? fn() : defaultValue;
  } catch (e) {
    return defaultValue || defaultValue === "" || defaultValue === 0
      ? defaultValue
      : undefined;
  }
}
