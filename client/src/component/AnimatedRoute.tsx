import { Route, Routes, useLocation } from "react-router-dom";
import { IHome } from "../interface/Interface";
import Expensive from "../page/Expensive";
import Home from "../page/Home";
import Inventory from "../page/Inventory";
import Stuff from "../page/Stuff";
import TrackingOrder from "../page/TrackingOrder";
import Websites from "../page/Website";

const AnimatedRoute = ({isOpen}: IHome) => {
  const location = useLocation();

  return (
    <>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home isOpen={isOpen} />} />
        <Route path="/*" element={<Home isOpen={isOpen} />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/others" element={<Stuff />} />
        <Route path="/website" element={<Websites />} />
        <Route path="/expensive" element={<Expensive />} />
        <Route path="/tracking" element={<TrackingOrder />} />
      </Routes>
    </>
  );
};

export default AnimatedRoute;
