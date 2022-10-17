import { useEffect, useState } from "react";
import { IGetSites, ISite } from "../interface/Interface";
import axios from "axios";
import { useAppSelector } from "../app/hooks";
import CloseIcon from "@mui/icons-material/Close";

const GetSites = ({ type }: IGetSites) => {
  const websites = useAppSelector((state) => state.websites.websites);
  const resellWebsites = useAppSelector(
    (state) => state.resellWebsites.websites
  );

  return (
    <div className="mt-6 w-11/12 mx-auto">
      <ul className="grid grid-cols-6 gap-4 text-center">
        {(type === "retailer" ? websites : resellWebsites).map(
          (site: ISite, index: number) => {
            return (
              <li
                key={index}
                className="p-3 bg-gradient-to-r from-purple-300 to-purple-200 font-bold text-slate-50 rounded-br-lg rounded-tl-lg transition ease-in-out hover:scale-110 duration-300"
              >
                {site.name}
              </li>
            );
          }
        )}
      </ul>
    </div>
  );
};

export default GetSites;
