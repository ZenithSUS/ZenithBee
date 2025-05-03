import { useState } from "react";
import { SidebarNav } from "../utils/types";
import { Link } from "react-router-dom";
import { PowerCircleIcon } from "lucide-react";
import { LogoutModal } from "./modals/logout";
import ProductIcon from "../assets/navigation/order.png";
import HomeIcon from "../assets/navigation/home.png";
import FavoriteIcon from "../assets/navigation/favorites.png";
import OrderIcon from "../assets/navigation/bell.png";
import BookIcon from "../assets/navigation/reserved.png";

const SidebarNavigation: SidebarNav[] = [
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
];

export default function Sidebar() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [showLogoutModal, setShowLogoutModal] = useState<boolean>(false);

  const handleLogout = () => {
    setShowLogoutModal(true);
    setHoveredItem(null);
  };

  return (
    <aside className="bg-primary-color dark:bg-primary-dark-color fixed top-0 left-0 z-30 hidden h-full w-[100px] flex-col items-center justify-center gap-10 md:flex">
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
            className="${ h-6 w-6 cursor-pointer transition duration-300 ease-in-out hover:scale-110 dark:brightness-100 dark:invert"
          />
          {hoveredItem === nav.name && (
            <div className="${ dark:bg-accent-dark-color bg-accent-color absolute left-8 z-10 ml-2 rounded px-2 py-1 whitespace-nowrap text-white">
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

      {showLogoutModal && (
        <LogoutModal
          isModalOpen={showLogoutModal}
          setIsModalOpen={setShowLogoutModal}
        />
      )}
    </aside>
  );
}
