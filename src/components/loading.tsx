import { Atom } from "react-loading-indicators";
import { useTheme } from "../context/theme";

export default function Loading() {
  const { isDarkMode } = useTheme();

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Atom
        color={isDarkMode ? "#0091d7" : "#FF5C28"}
        size="large"
        text="loading..."
        textColor={isDarkMode ? "#0091d7" : "#FF5C28"}
      />
    </div>
  );
}
