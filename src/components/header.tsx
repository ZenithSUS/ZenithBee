import { useTheme } from "../context/theme";
import { SunIcon, MoonIcon, MenuIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTransition } from "react";
import Anonymous from "../assets/ui/anonymous.jpg";
import sleep from "../utils/functions/sleep";

type HeaderProps = {
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Header({
  isSidebarOpen,
  setIsSidebarOpen,
}: HeaderProps) {
  const [isPending, startTransition] = useTransition();
  const profileImage = JSON.parse(
    localStorage.getItem("profileImage") as string,
  );
  const name = JSON.parse(localStorage.getItem("name") as string);
  const { toggleDarkMode, isDarkMode } = useTheme();
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSwitchTheme = () => {
    startTransition(async () => {
      toggleDarkMode();
      await sleep(500);
    });
  };

  return (
    <>
      <header className="bg-primary-color dark:bg-primary-dark-color sticky top-0 right-0 left-0 z-40 flex flex-col items-center justify-between gap-3 p-4 md:flex-row md:gap-0">
        <div className="flex items-center">
          <button
            type="button"
            onClick={toggleSidebar}
            className="mr-4 cursor-pointer lg:hidden"
            aria-label="Toggle sidebar"
          >
            <MenuIcon size={25} />
          </button>
          <h1 className="text-2xl font-bold">ZenithBee</h1>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="flex cursor-pointer items-center gap-2"
            onClick={() => navigate("/account")}
          >
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
          </div>
          <button
            type="button"
            onClick={() => handleSwitchTheme()}
            className="cursor-pointer"
            disabled={isPending}
          >
            {isDarkMode ? <MoonIcon size={25} /> : <SunIcon size={25} />}
          </button>
        </div>
      </header>
    </>
  );
}
