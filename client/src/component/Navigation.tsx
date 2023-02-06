import { INavigation } from "../interface/Interface";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { MdSpaceDashboard } from "react-icons/md";
import { MdInventory2 } from "react-icons/md";
import { GiRunningShoe } from "react-icons/gi";
import { SiWebcomponentsdotorg } from "react-icons/si";
import { MdPointOfSale } from "react-icons/md";
import { FaTruckLoading } from "react-icons/fa";
import { ImHome3 } from "react-icons/im";
import { NavLink, useLocation, useMatch } from "react-router-dom";

const Navigation = ({ setIsOpen, isOpen }: INavigation) => {
  const location = useLocation();

  const menus = [
    { name: "Accueil", link: "/", icon: <ImHome3 /> },
    { name: "Chaussures", link: "/inventory", icon: <GiRunningShoe /> },
    { name: "Autres", link: "/inventory", icon: <MdInventory2 /> },
    { name: "Dépenses", link: "/expensive", icon: <MdPointOfSale /> },
    { name: "Retailers", link: "/website", icon: <SiWebcomponentsdotorg /> },
    { name: "Suivi de commandes", link: "/tracking", icon: <FaTruckLoading /> },
  ];
  return (
    <aside className="bg-indigo-500 h-screen text-white sticky top-0 rounded-r-xl">
      <div
        className="absolute text-2xl -right-4 top-20 rounded-full bg-white text-indigo-500 drop-shadow-lg p-1"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <MdOutlineKeyboardArrowLeft />
        ) : (
          <MdOutlineKeyboardArrowRight />
        )}
      </div>
      <div className="flex items-center p-5 pt-8">
        <span className="text-2xl">
          <MdSpaceDashboard />
        </span>
        <h1
          className={`text-2xl ml-4 font-medium duration-300 origin-left pb-1 ${
            !isOpen && "scale-0"
          }`}
        >
          Dashboard
        </h1>
      </div>

      <ul className="flex flex-col justify-around gap-y-4 p-3 cursor-pointer mt-6">
        {menus.map((menu, index) => {
          return (
            <NavLink to={menu.link} key={index}>
              <li
                className={`flex text-gray-300 text-sm p-2 cursor-pointer gap-x-4 rounded-md mt-2 hover:bg-indigo-400 ${
                  location.pathname === menu.link && "bg-indigo-600"
                }`}
              >
                <div className="flex items-center gap-x-5">
                  <span className="text-2xl">{menu.icon}</span>
                  <span className={`${!isOpen && "hidden"} flex-none`}>
                    {menu.name}
                  </span>
                </div>
              </li>
            </NavLink>
          );
        })}
      </ul>
    </aside>
  );
};

export default Navigation;
