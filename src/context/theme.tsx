import { account } from "../appwrite";
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
  toggleDarkMode: async () => {},
});

export const ThemeProvider = ({ children }: ThemeProviderProp) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark";
  });

  const toggleDarkMode = async () => {
    const newThemeState = !isDarkMode;

    setIsDarkMode(newThemeState);

    try {
      const accountPrefs = await account.getPrefs();

      await account.updatePrefs({
        theme: newThemeState ? "dark" : "light",
        imageUrl: accountPrefs.imageUrl,
        imageId: accountPrefs.imageId,
      });

      localStorage.setItem("theme", newThemeState ? "dark" : "light");

      if (newThemeState) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    } catch (error) {
      console.error("Error updating theme:", error);

      setIsDarkMode(!newThemeState);
    }
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
