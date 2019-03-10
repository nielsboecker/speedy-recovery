export function formatDate(date) {
  if (date) {
    return new Date(date).toLocaleString("en-uk");
  }
  return "Invalid date";
}
