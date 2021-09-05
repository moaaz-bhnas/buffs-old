// https://stackoverflow.com/a/8888498/7982963

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function zeroPadded(minutes) {
  return minutes < 10 ? `0${minutes}` : minutes;
}

export default function formatDateForReview(date) {
  const dateObj = new Date(date);

  const monthIndex = dateObj.getMonth();
  const day = dateObj.getDate();
  const hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();

  const hour12 = hours % 12 || 12;
  const ampm = hours >= 12 ? "pm" : "am";

  const result = `${months[monthIndex]} ${day} at ${hour12}:${zeroPadded(
    minutes
  )} ${ampm.toUpperCase()}`;

  return result;
}
