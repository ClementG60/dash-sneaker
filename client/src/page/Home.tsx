import axios from "axios";
import { useEffect } from "react";
import Statistics from "../component/Card/Statistics";
import Inventory from "../component/SneakerInventory";
import moment from "moment";

const Home = () => {

    
  useEffect(() => {
    const currentYear = moment().format("YYYY");
    const currentMonth = moment().format("MM");
    axios({
      method: "get",
      url: `${process.env.REACT_APP_URL_API}get-stats/sneakers/month/${currentYear}/${currentMonth}`,
    });
  }, []);
  return (
    <div className="grid grid-cols-4 gap-4">
      <Statistics />
      <Statistics />
      <Statistics />
      <Statistics />
    </div>
  );
};

export default Home;
