import { INavigation } from "../interface/Interface";
import { BsArrowRightShort } from "react-icons/bs";
import { BsArrowLeftShort } from "react-icons/bs";
import { MdSpaceDashboard } from "react-icons/md";
import { MdOutlineInventory2 } from "react-icons/md";
import { SiWebcomponentsdotorg } from "react-icons/si";
import { SiNike } from "react-icons/si";
import { MdPointOfSale } from "react-icons/md";
import { FiHome } from "react-icons/fi";

const Navigation = ({ setIsOpen, isOpen }: INavigation) => {
  const menus = [
    { name: "Accueil", link: "/", icon: <FiHome /> },
    { name: "Inventaire", link: "/inventory", icon: <MdOutlineInventory2 /> },
    { name: "Dépenses", link: "/expensive", icon: <MdPointOfSale /> },
    { name: "Retailers", link: "/retailer", icon: <SiNike /> },
    {
      name: "Sites resellers",
      link: "/reseller",
      icon: <SiWebcomponentsdotorg />,
    },
  ];
  return (
    <div className="bg-purple-700 min-h-screen text-white relative">
      <div
        className="absolute text-3xl -right-3 top-9 rounded-full bg-white text-purple-700 border border-purple-700"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <BsArrowLeftShort /> : <BsArrowRightShort />}
      </div>
      <div className="inline-flex items-center p-5 pt-8">
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
            <li
              key={index}
              className="flex text-gray-300 text-sm p-2 cursor-pointer gap-x-4 rounded-md mt-2 hover:bg-purple-500"
            >
              <a href={menu.link} className="flex items-center gap-x-5">
                <span className="text-2xl">{menu.icon}</span>
                <span className={`${!isOpen && "hidden"} flex-none`}>
                  {menu.name}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Navigation;
