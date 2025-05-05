import { useContext, createContext, useState, useEffect } from "react";

type ThemeContextProp = {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
};

type ThemeProviderProp = {
  children: React.ReactNode;
};

const ThemeContext = createContext<ThemeContextProp>({
  isDarkMode: false,
  toggleDarkMode: () => {},
});

export const ThemeProvider = ({ children }: ThemeProviderProp) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(
    localStorage.getItem("theme") === "dark",
  );

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    localStorage.setItem("theme", isDarkMode ? "light" : "dark");
    isDarkMode
      ? document.documentElement.classList.add("dark")
      : document.documentElement.classList.remove("dark");
  };

  useEffect(() => {
    isDarkMode
      ? document.documentElement.classList.add("dark")
      : document.documentElement.classList.remove("dark");
  }, [isDarkMode]);

  return (
    <ThemeContext value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </ThemeContext>
  );
};

export const useTheme = () => useContext(ThemeContext);
