import Navigation from "./interface/componants/Part/Navigation";
import { BrowserRouter } from "react-router-dom";
import { useAppDispatch } from "./app/hooks";
import { useEffect, useState } from "react";
import axios from "axios";
import { setResellWebsites } from "./domain/usecases/resellWebsitesSlice";
import { setWebsites } from "./domain/usecases/websitesSlice";
import { setBrands } from "./domain/usecases/brandsSlice";
import moment from "moment";
import { ToastContainer } from "react-toastify";
import { setTrackings } from "./domain/usecases/trackingsSlice";
import AnimatedRoute from "./interface/componants/AnimatedRoute";
import { SkeletonTheme } from "react-loading-skeleton";
import { getWebsitesAPI } from "./infrastructure/WebsiteAPI";
import { getTrackingsAPI } from "./infrastructure/TrackingAPI";
import { getBrandsAPI } from "./infrastructure/BrandAPI";

const App = () => {
  moment.locale("fr", {
    months:
      "Janvier_Février_Mars_Avril_Mai_Juin_Juillet_Août_Septembre_Octobre_Novembre_Décembre".split(
        "_"
      ),
  });
  const dispatch = useAppDispatch();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    getWebsitesAPI("resell-websites").then((res) =>
      dispatch(setResellWebsites(res.data))
    );
    
    getWebsitesAPI("websites").then((res) => dispatch(setWebsites(res.data)));

    getBrandsAPI().then((res) => dispatch(setBrands(res.data)));

    getTrackingsAPI().then((res) => dispatch(setTrackings(res.data)));
  }, [dispatch]);

  return (
    <div className="bg-slate-100">
      <SkeletonTheme baseColor="#F2F2F2" highlightColor="#E6E6E6">
        <BrowserRouter>
          <div className="flex flex-row min-h-full">
            <div
              className={`flex-none ${isOpen ? "w-60" : "w-16"} duration-300`}
            >
              <Navigation setIsOpen={setIsOpen} isOpen={isOpen} />
            </div>
            <div className="flex-auto">
              <div className="mt-4">
                <AnimatedRoute isOpen={isOpen} />
              </div>
            </div>
          </div>
        </BrowserRouter>
        <ToastContainer />
      </SkeletonTheme>
    </div>
  );
};

export default App;
