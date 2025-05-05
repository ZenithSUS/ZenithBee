export default function formatDate(date: string) {
  const formatDate = new Date(date);
  return formatDate.toLocaleString("en-US", { dateStyle: "full" });
}
