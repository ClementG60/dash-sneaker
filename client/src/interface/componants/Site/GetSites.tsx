import { IGetSites, ISite } from "../../../domain/entities/Interface";
import { useAppSelector } from "../../../app/hooks";

import Sites from "./Sites";

const GetSites = ({ type, deleteProduct }: IGetSites) => {
  const websites = useAppSelector((state) => state.websites.websites);
  const resellWebsites = useAppSelector(
    (state) => state.resellWebsites.websites
  );

  return (
    <div className="mt-6 w-11/12 mx-auto">
      <ul className="grid grid-cols-6 gap-4 text-center">
        {(type === "website" ? websites : resellWebsites).map(
          (site: ISite, index: number) => {
            return <Sites key={index} site={site} deleteProduct={deleteProduct} type={type}/>;
          }
        )}
      </ul>
    </div>
  );
};

export default GetSites;
