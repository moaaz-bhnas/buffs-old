export default function truncateText(text, wordsNum = 28) {
  const textArray = text.split(" ").slice(0, wordsNum);
  const truncatedText = textArray.join(" ") + "...";
  return truncatedText;
}
