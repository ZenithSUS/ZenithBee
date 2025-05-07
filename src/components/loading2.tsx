import { BlinkBlur } from "react-loading-indicators";
import { useTheme } from "../context/theme";

export default function Loading2() {
  const { isDarkMode } = useTheme();

  return (
    <BlinkBlur
      color={isDarkMode ? "#0091d7" : "#FF5C28"}
      size="small"
      text=""
      textColor={isDarkMode ? "#0091d7" : "#FF5C28"}
    />
  );
}
