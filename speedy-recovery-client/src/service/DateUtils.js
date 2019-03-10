export function formatDate(date) {
  if (date) {
    return new Date(date).toLocaleString("en-uk");
  }
  return "Invalid date";
}

// Source: https://stackoverflow.com/questions/1353684/detecting-an-invalid-date-date-instance-in-javascript
export function isValidDate(date) {
  return date instanceof Date && !isNaN(date);
}
