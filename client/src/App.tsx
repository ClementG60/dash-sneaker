import Navigation from "./component/Navigation";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Reseller from "./page/Reseller";
import Retailer from "./page/Retailer";
import Home from "./page/Home";
import { useAppDispatch } from "./app/hooks";
import { useEffect, useState } from "react";
import axios from "axios";
import { setSneakers } from "./feature/sneakersSlice";
import { setResellWebsites } from "./feature/resellWebsitesSlice";
import { setWebsites } from "./feature/websitesSlice";
import Expensive from "./page/Expensive";
import Inventory from "./page/Inventory";

const App = () => {
  const dispatch = useAppDispatch();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_URL_API}sneaker/get-sneakers`,
    }).then((res) => dispatch(setSneakers(res.data)));

    axios({
      method: "get",
      url: `${process.env.REACT_APP_URL_API}website/get-resell-websites`,
    }).then((res) => dispatch(setResellWebsites(res.data)));

    axios({
      method: "get",
      url: `${process.env.REACT_APP_URL_API}website/get-websites`,
    }).then((res) => dispatch(setWebsites(res.data)));
  }, []);

  return (
    <div className="flex flex-row min-h-full">
      <div className={`flex-none ${isOpen ? "w-72" :"w-16"} duration-300`}>
        <Navigation setIsOpen={setIsOpen} isOpen={isOpen}/>
      </div>
      <div className="flex-auto">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/*" element={<Home />} />
          <Route path="/inventoy" element={<Inventory />} />
          <Route path="/retailer" element={<Retailer />} />
          <Route path="/reseller" element={<Reseller />} />
          <Route path="/expensive" element={<Expensive />} />
        </Routes>
      </BrowserRouter>

      </div>
    </div>
  );
};

export default App;
