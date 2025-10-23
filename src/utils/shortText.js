export default function shortText(text) {
  if (text.length > 13) {
    return (text = text.substring(0, 13) + "...");
  } else {
    return text;
  }
}
