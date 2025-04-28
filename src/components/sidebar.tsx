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
    name: "Notification",
    image: BellIcon,
    navigate: "/notification",
  },
  {
    name: "Reserved",
    image: BookIcon,
    navigate: "/reserved",
  },
];

export default function Sidebar() {
  return (
    <aside className="bg-primary-color fixed top-0 left-0 flex h-full w-[100px] flex-col items-center justify-center gap-10">
      {SidebarNavigation.map((nav) => (
        <Link to={nav.navigate} key={nav.name}>
          <img src={nav.image} alt={nav.name} className="h-8 w-8" />
        </Link>
      ))}
    </aside>
  );
}
