// date (e.g. 2000-5-6)
export default function dateToYear(date) {
  if (!date) return "";

  const firstDashIndex = date.indexOf("-");
  const year = date.slice(0, firstDashIndex);
  return year;
}
