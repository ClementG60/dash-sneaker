import { Route, Routes, useLocation } from "react-router-dom";
import { IHome } from "../../domain/entities/Interface";
import Expensive from "../../interface/pages/Expensive";
import Home from "../../interface/pages/Home";
import Inventory from "../../interface/pages/Inventory";
import Stuff from "../../interface/pages/Stuff";
import TrackingOrder from "../../interface/pages/TrackingOrder";
import Websites from "../../interface/pages/Website";

//permet l'utilisation du useLocation
const AnimatedRoute = ({ isOpen }: IHome) => {
  const location = useLocation();

  return (
    <>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home isOpen={isOpen} />} />
        <Route path="/*" element={<Home isOpen={isOpen} />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/stuffs" element={<Stuff />} />
        <Route path="/website" element={<Websites />} />
        <Route path="/expensive" element={<Expensive />} />
        <Route path="/tracking" element={<TrackingOrder />} />
      </Routes>
    </>
  );
};

export default AnimatedRoute;
