import Navigation from "./component/Navigation";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Reseller from "./page/Reseller";
import Retailer from "./page/Retailer";
import Inventory from "./page/Inventory";

const App = () => {
  return (
    <>
      <Navigation />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Inventory />} />
          <Route path="/*" element={<Inventory />} />
          <Route path="/retailer" element={<Retailer />} />
          <Route path="/reseller" element={<Reseller />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
