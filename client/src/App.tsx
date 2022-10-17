import Navigation from "./component/Navigation";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Reseller from "./page/Reseller";
import Retailer from "./page/Retailer";
import Home from "./page/Home";
import { useAppDispatch } from "./app/hooks";
import { useEffect } from "react";
import axios from "axios";
import { setSneakers } from "./feature/sneakersSlice";
import { setResellWebsites } from "./feature/resellWebsitesSlice";
import { setWebsites } from "./feature/websitesSlice";

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    axios({
        method: "get",
        url: `${process.env.REACT_APP_URL_API}sneaker/get-sneakers`
    })
        .then(res => dispatch(setSneakers(res.data)))

    axios({
        method: "get",
        url: `${process.env.REACT_APP_URL_API}website/get-resell-websites`
    })
        .then(res => dispatch(setResellWebsites(res.data)))

    axios({
        method: "get",
        url: `${process.env.REACT_APP_URL_API}website/get-websites`
    })
        .then(res => dispatch(setWebsites(res.data)))
}, []);


  return (
    <>
      <Navigation />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/*" element={<Home />} />
          <Route path="/retailer" element={<Retailer />} />
          <Route path="/reseller" element={<Reseller />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
