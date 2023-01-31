import Navigation from "./component/Navigation";
import { BrowserRouter } from "react-router-dom";
import Website from "./page/Website";
import Home from "./page/Home";
import { useAppDispatch } from "./app/hooks";
import { useEffect, useState } from "react";
import axios from "axios";
import { setResellWebsites } from "./feature/resellWebsitesSlice";
import { setWebsites } from "./feature/websitesSlice";
import Expensive from "./page/Expensive";
import Inventory from "./page/Inventory";
import { setBrands } from "./feature/brandsSlice";
import moment from "moment";
import { ToastContainer } from "react-toastify";
import TrackingOrder from "./page/TrackingOrder";
import { setTrackings } from "./feature/trackingsSlice";
import AnimatedRoute from "./component/AnimatedRoute";

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
    axios({
      method: "get",
      url: `${process.env.REACT_APP_URL_API}api/website/get-resell-websites`,
    }).then((res) => dispatch(setResellWebsites(res.data)));

    axios({
      method: "get",
      url: `${process.env.REACT_APP_URL_API}api/website/get-websites`,
    }).then((res) => dispatch(setWebsites(res.data)));

    axios({
      method: "get",
      url: `${process.env.REACT_APP_URL_API}api/brand/get`,
    }).then((res) => dispatch(setBrands(res.data)));

    axios({
      method: "get",
      url: `${process.env.REACT_APP_URL_API}api/trackings/get`,
    }).then((res) => dispatch(setTrackings(res.data)));
  }, []);

  return (
    <div className="bg-slate-100">
      <BrowserRouter>
        <div className="flex flex-row min-h-full">
          <div className={`flex-none ${isOpen ? "w-60" : "w-16"} duration-300`}>
            <Navigation setIsOpen={setIsOpen} isOpen={isOpen} />
          </div>
          <div className="flex-auto">
            <div className="mt-4">
              <AnimatedRoute isOpen={isOpen}/>
            </div>
          </div>
        </div>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
};

export default App;
