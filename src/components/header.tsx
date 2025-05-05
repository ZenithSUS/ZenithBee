import { useTheme } from "../context/theme";
import { SunIcon, MoonIcon } from "lucide-react";
import Anonymous from "../assets/ui/anonymous.jpg";

export default function Header() {
  const profileImage = JSON.parse(
    localStorage.getItem("profileImage") as string,
  );
  const name = JSON.parse(localStorage.getItem("name") as string);
  const { toggleDarkMode, isDarkMode } = useTheme();

  return (
    <header className="bg-primary-color dark:bg-primary-dark-color sticky top-0 right-0 left-0 z-40 flex flex-col items-center justify-between gap-3 p-4 md:flex-row md:gap-0">
      <h1 className="text-2xl font-bold">ZenithBee</h1>
      <div className="flex items-center gap-2">
        <img
          src={
            profileImage !== null && profileImage != "N/A"
              ? profileImage
              : Anonymous
          }
          alt="Profile"
          className="h-12 w-12 rounded-full object-cover"
        />
        <p className="text-lg font-semibold">{name}</p>
        <button
          type="button"
          onClick={toggleDarkMode}
          className="cursor-pointer"
        >
          {isDarkMode ? <MoonIcon size={25} /> : <SunIcon size={25} />}
        </button>
      </div>
    </header>
  );
}
