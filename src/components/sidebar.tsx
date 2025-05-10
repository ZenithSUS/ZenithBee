// Sidebar.tsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { PowerCircleIcon, X } from "lucide-react";
import { LogoutModal } from "./modals/logout";
import ProductIcon from "../assets/navigation/order.png";
import HomeIcon from "../assets/navigation/home.png";
import FavoriteIcon from "../assets/navigation/favorites.png";
import OrderIcon from "../assets/navigation/bell.png";
import BookIcon from "../assets/navigation/reserved.png";
import UserIcon from "../assets/navigation/user.png";

type SidebarNav = {
  name: string;
  image: string;
  navigate: string;
};

export const SidebarNavigation: SidebarNav[] = [
  {
    name: "Products",
    image: ProductIcon,
    navigate: "/products",
  },
  {
    name: "Favorites",
    image: FavoriteIcon,
    navigate: "/favorites",
  },
  {
    name: "Home",
    image: HomeIcon,
    navigate: "/",
  },
  {
    name: "Orders",
    image: OrderIcon,
    navigate: "/orders",
  },
  {
    name: "Reserved",
    image: BookIcon,
    navigate: "/reserved",
  },
  {
    name: "Account",
    image: UserIcon,
    navigate: "/account",
  },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [showLogoutModal, setShowLogoutModal] = useState<boolean>(false);

  const handleLogout = () => {
    setShowLogoutModal(true);
    setHoveredItem(null);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.getElementById("mobile-sidebar");
      const target = event.target as Node;
      if (isOpen && sidebar && !sidebar.contains(target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="bg-primary-color dark:bg-primary-dark-color fixed top-0 left-0 z-30 hidden h-full w-[100px] flex-col items-center justify-center gap-10 lg:flex">
        {SidebarNavigation.map((nav) => (
          <Link
            to={nav.navigate}
            key={nav.name}
            className="relative flex items-center"
            onMouseEnter={() => setHoveredItem(nav.name)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <img
              src={nav.image}
              alt={nav.name}
              className="h-6 w-6 cursor-pointer transition duration-300 ease-in-out hover:scale-110 dark:brightness-100 dark:invert"
            />
            {hoveredItem === nav.name && (
              <div className="bg-accent-color dark:bg-accent-dark-color absolute left-8 z-10 ml-2 rounded px-2 py-1 whitespace-nowrap text-white">
                {nav.name}
              </div>
            )}
          </Link>
        ))}
        <button
          onClick={handleLogout}
          className="relative flex items-center"
          onMouseEnter={() => setHoveredItem("Logout")}
          onMouseLeave={() => setHoveredItem(null)}
        >
          <PowerCircleIcon
            color="#000000"
            className="h-6 w-6 cursor-pointer transition duration-300 ease-in-out hover:scale-110 dark:brightness-100 dark:invert"
          />
          {hoveredItem === "Logout" && (
            <div className="bg-accent-color dark:bg-accent-dark-color absolute left-8 z-10 ml-2 rounded px-2 py-1 whitespace-nowrap text-white">
              Logout
            </div>
          )}
        </button>
      </aside>

      {/* Mobile/Tablet Sidebar Overlay */}
      {isOpen && (
        <div className="bg-opacity-50 fixed inset-0 z-40 bg-black/55 lg:hidden" />
      )}

      {/* Mobile/Tablet Sidebar */}
      <aside
        id="mobile-sidebar"
        className={`bg-primary-color dark:bg-primary-dark-color fixed top-0 left-0 z-50 h-full w-64 transform transition-transform duration-300 ease-in-out lg:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col p-4">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-bold">ZenithBee</h2>
            <button onClick={onClose} className="p-1">
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="flex flex-col gap-6">
            {SidebarNavigation.map((nav) => (
              <Link
                to={nav.navigate}
                key={nav.name}
                className="flex items-center gap-4"
                onClick={onClose}
              >
                <img
                  src={nav.image}
                  alt={nav.name}
                  className="h-6 w-6 dark:brightness-100 dark:invert"
                />
                <span className="text-lg">{nav.name}</span>
              </Link>
            ))}
            <button
              onClick={handleLogout}
              className="mt-auto flex items-center gap-4"
            >
              <PowerCircleIcon
                color="#000000"
                className="h-6 w-6 dark:brightness-100 dark:invert"
              />
              <span className="text-lg">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {showLogoutModal && (
        <LogoutModal
          isModalOpen={showLogoutModal}
          setIsModalOpen={setShowLogoutModal}
        />
      )}
    </>
  );
}
