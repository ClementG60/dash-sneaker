import axios from "axios";
import { useEffect, useState } from "react";
import Statistics from "../component/Card/CardStatistics";
import moment from "moment";
import { IHome } from "../interface/Interface";

const Home = ({ isOpen }: IHome) => {
  const [monthExpensives, setMonthExpensives] = useState<number>();
  const [lastMonthExpensives, setLastMonthExpensives] = useState<number>();
  const [monthBuys, setMonthBuys] = useState<number>();
  const [lastMonthBuys, setLastMonthBuys] = useState<number>();
  const [monthSells, setMonthSells] = useState<number>();
  const [lastMonthSells, setLastMonthSells] = useState<number>();

  useEffect(() => {
    const currentYear = moment().format("YYYY");
    const currentMonth = moment().format("MM");
    const lastDate = moment().subtract(1, "months").calendar();
    const pastMonth = moment(lastDate).format("MM");
    const pastYear = moment(lastDate).format("YYYY");

    axios({
      method: "get",
      url: `${process.env.REACT_APP_URL_API}statistics/get-sums/expensives/month/${currentYear}/${currentMonth}`,
    }).then((res) => {
      setMonthExpensives(res.data[0].sum);
      console.log(res.data[0].sum);
    });

    axios({
      method: "get",
      url: `${process.env.REACT_APP_URL_API}statistics/get-sums/expensives/month/${pastYear}/${pastMonth}`,
    }).then((res) => {
      setLastMonthExpensives(res.data[0].sum);
      console.log(res.data[0].sum);
    });

    axios({
      method: "get",
      url: `${process.env.REACT_APP_URL_API}statistics/get-sums/sneakersBuying/month/${currentYear}/${currentMonth}`,
    }).then((res) => {
      setMonthBuys(res.data[0].sum);
    });

    axios({
      method: "get",
      url: `${process.env.REACT_APP_URL_API}statistics/get-sums/sneakersBuying/month/${pastYear}/${pastMonth}`,
    }).then((res) => {
      setLastMonthBuys(res.data[0].sum);
    });

    axios({
      method: "get",
      url: `${process.env.REACT_APP_URL_API}statistics/get-sums/sneakersSelling/month/${currentYear}/${currentMonth}`,
    }).then((res) => {
      setMonthSells(res.data[0].sum);
    });

    axios({
      method: "get",
      url: `${process.env.REACT_APP_URL_API}statistics/get-sums/sneakersSelling/month/${pastYear}/${pastMonth}`,
    }).then((res) => {
      setLastMonthSells(res.data[0].sum);
    });
  }, []);
  return (
    <div className="grid grid-cols-3 gap-4 p-3">
      <h2 className="col-start-1 col-end-2 w-8/12 mx-auto font-bold text-xl">
        Récapitulatif du mois
      </h2>
      {monthExpensives && lastMonthExpensives && (
        <div className="col-start-1">
          <Statistics
            sum={monthExpensives}
            title={"Dépenses du mois"}
            lastSumMonth={lastMonthExpensives}
            isOpen={isOpen}
          />
        </div>
      )}
      {monthBuys && lastMonthBuys && (
        <Statistics
          sum={monthBuys}
          title={"Achat du mois"}
          lastSumMonth={lastMonthBuys}
          isOpen={isOpen}
        />
      )}
      {monthSells && lastMonthSells && (
        <Statistics
          sum={monthSells}
          title={"Vente du mois"}
          lastSumMonth={lastMonthSells}
          isOpen={isOpen}
        />
      )}
    </div>
  );
};

export default Home;
