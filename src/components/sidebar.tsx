import { useState } from "react";
import { SidebarNav } from "../utils/types";
import { Link } from "react-router-dom";
import OrderIcon from "../assets/navigation/order.png";
import HomeIcon from "../assets/navigation/home.png";
import FavoriteIcon from "../assets/navigation/favorites.png";
import BellIcon from "../assets/navigation/bell.png";
import BookIcon from "../assets/navigation/reserved.png";

const SidebarNavigation: SidebarNav[] = [
  {
    name: "Orders",
    image: OrderIcon,
    navigate: "/orders",
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
    name: "NewComers",
    image: BellIcon,
    navigate: "/newcomers",
  },
  {
    name: "Reserved",
    image: BookIcon,
    navigate: "/reserved",
  },
];

export default function Sidebar() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <aside className="bg-primary-color fixed top-0 left-0 z-30 hidden h-full w-[100px] flex-col items-center justify-center gap-10 md:flex">
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
            className="h-6 w-6 cursor-pointer transition duration-300 ease-in-out hover:scale-110"
          />
          {hoveredItem === nav.name && (
            <div className="bg-accent-color absolute left-8 z-10 ml-2 rounded px-2 py-1 whitespace-nowrap text-white">
              {nav.name}
            </div>
          )}
        </Link>
      ))}
    </aside>
  );
}
