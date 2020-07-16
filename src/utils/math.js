export function valuesBetween(value, min, max) {
  if (value >= min && value <= max) {
    return true;
  }

  return false;
}