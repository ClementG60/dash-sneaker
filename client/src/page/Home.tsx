import axios from "axios";
import { useEffect, useState } from "react";
import CardStatistics from "../component/Card/CardStatistics";
import moment from "moment";
import { IChartData, IHome } from "../interface/Interface";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import CardChart from "../component/Card/CardChart";

ChartJS.register(ArcElement, Tooltip, Legend);

const Home = ({ isOpen }: IHome) => {
  const [monthExpensives, setMonthExpensives] = useState<number>();
  const [lastMonthExpensives, setLastMonthExpensives] = useState<number>();
  const [monthBuys, setMonthBuys] = useState<number>();
  const [lastMonthBuys, setLastMonthBuys] = useState<number>();
  const [monthSells, setMonthSells] = useState<number>();
  const [lastMonthSells, setLastMonthSells] = useState<number>();
  const [brandBuyData, setBrandBuyData] = useState<Array<IChartData>>();
  const [websiteBuyData, setwebsiteBuyData] = useState<Array<IChartData>>();
  const [resellWebsiteData, setResellWebsiteData] = useState<Array<IChartData>>();
  // const [isLoading, setIsLoading] = useState<boolean>(true);

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
    });

    axios({
      method: "get",
      url: `${process.env.REACT_APP_URL_API}statistics/get-sums/expensives/month/${pastYear}/${pastMonth}`,
    }).then((res) => {
      setLastMonthExpensives(res.data[0].sum);
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

    axios({
      method: "get",
      url: `${process.env.REACT_APP_URL_API}statistics/get-buying-stats/buys/brandId/${currentYear}/${currentMonth}`,
    }).then((res) => setBrandBuyData(res.data));

    axios({
      method: "get",
      url: `${process.env.REACT_APP_URL_API}statistics/get-buying-stats/buys/websiteId/${currentYear}/${currentMonth}`,
    }).then((res) => setwebsiteBuyData(res.data));

    axios({
      method: "get",
      url: `${process.env.REACT_APP_URL_API}statistics/get-buying-stats/sales/resellWebsiteId/${currentYear}/${currentMonth}`,
    }).then((res) => setResellWebsiteData(res.data));
  }, []);  

  return (
    <div className="grid grid-cols-3 gap-4 p-5">
      <h2 className="col-start-1 col-end-4 text-indigo-900 w-11/12 mx-auto font-bold text-xl">
        Récapitulatif du mois
      </h2>
      {monthExpensives && lastMonthExpensives && (
        <div className="col-start-1">
          <CardStatistics
            sum={monthExpensives}
            title={"Dépenses"}
            lastSumMonth={lastMonthExpensives}
            isOpen={isOpen}
          />
        </div>
      )}
      {monthBuys && lastMonthBuys && (
        <CardStatistics
          sum={monthBuys}
          title={"Achat"}
          lastSumMonth={lastMonthBuys}
          isOpen={isOpen}
        />
      )}
      {monthSells && lastMonthSells && (
        <CardStatistics
          sum={monthSells}
          title={"Vente"}
          lastSumMonth={lastMonthSells}
          isOpen={isOpen}
        />
      )}
      {brandBuyData && (
        <CardChart title="Marques" data={brandBuyData} isOpen={isOpen} labelTitle="Nombre d'achat(s)" type="brand" />
      )}
      {websiteBuyData && (
        <CardChart title="Site d'achat" data={websiteBuyData} isOpen={isOpen} labelTitle="Nombres d'achat(s)" type="website" />
      )}
      {resellWebsiteData && (
        <CardChart title="Site de ventes" data={resellWebsiteData} isOpen={isOpen} labelTitle="Nombre de vente(s)" type="resellWebsite"/>
      )}
    </div>
  );
};

export default Home;
