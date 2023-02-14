import axios from "axios";
import { useEffect, useState } from "react";
import CardSum from "../component/Card/CardSum";
import moment from "moment";
import { IChartData, IHome } from "../interface/Interface";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import CardChart from "../component/Card/CardChart";
import CardSingleStat from "../component/Card/CardSingleStat";

ChartJS.register(ArcElement, Tooltip, Legend);

const Home = ({ isOpen }: IHome) => {
  const [totalShoe, setTotalShoe] = useState<number>();
  const [totalShoeSold, setTotalShoeSold] = useState<number>();
  const [totalShoeLastYear, setTotalShoeLastYear] = useState<number>();
  const [totalShoeSoldLastYear, setTotalShoeSoldLastYear] = useState<number>();
  const [monthExpensives, setMonthExpensives] = useState<number>();
  const [lastMonthExpensives, setLastMonthExpensives] = useState<number>();
  const [monthBuys, setMonthBuys] = useState<number>();
  const [lastMonthBuys, setLastMonthBuys] = useState<number>();
  const [monthSells, setMonthSells] = useState<number>();
  const [lastMonthSells, setLastMonthSells] = useState<number>();
  const [brandBuyData, setBrandBuyData] = useState<Array<IChartData>>();
  const [websiteBuyData, setwebsiteBuyData] = useState<Array<IChartData>>();
  const [resellWebsiteData, setResellWebsiteData] =
    useState<Array<IChartData>>();
  // const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const currentYear = moment().format("YYYY");
    const currentMonth = moment().format("MM");
    const lastDate = moment().subtract(1, "months").calendar();
    const pastMonth = moment(lastDate).format("MM");
    const pastYear = moment(lastDate).format("YYYY");

    axios({
      method: "get",
      url: `${process.env.REACT_APP_URL_API}api/statistics/buyings/general/year/${currentYear}`,
    }).then((res) => {
      setTotalShoe(res.data.length);
    });

    axios({
      method: "get",
      url: `${process.env.REACT_APP_URL_API}api/statistics/buyings/general/year/${pastYear}`,
    }).then((res) => {
      setTotalShoeLastYear(res.data.length);
    });

    axios({
      method: "get",
      url: `${process.env.REACT_APP_URL_API}api/statistics/sales/general/year/${currentYear}`,
    }).then((res) => {
      setTotalShoeSold(res.data.length);
    });

    axios({
      method: "get",
      url: `${process.env.REACT_APP_URL_API}api/statistics/sales/general/year/${pastYear}`,
    }).then((res) => {
      setTotalShoeSoldLastYear(res.data.length);
    });

    axios({
      method: "get",
      url: `${process.env.REACT_APP_URL_API}api/statistics/sums/price/expensives/month/${currentYear}/${currentMonth}`,
    }).then((res) => {
      setMonthExpensives(res.data[0].sum);
    });

    axios({
      method: "get",
      url: `${process.env.REACT_APP_URL_API}api/statistics/sums/price/expensives/month/${pastYear}/${pastMonth}`,
    }).then((res) => {
      setLastMonthExpensives(res.data[0].sum);
    });

    axios({
      method: "get",
      url: `${process.env.REACT_APP_URL_API}api/statistics/sums/price/sneakersBuying/month/${currentYear}/${currentMonth}`,
    }).then((res) => {
      setMonthBuys(res.data[0].sum);
    });

    axios({
      method: "get",
      url: `${process.env.REACT_APP_URL_API}api/statistics/sums/price/sneakersBuying/month/${pastYear}/${pastMonth}`,
    }).then((res) => {
      setLastMonthBuys(res.data[0].sum);
    });

    axios({
      method: "get",
      url: `${process.env.REACT_APP_URL_API}api/statistics/sums/price/sneakersSelling/month/${currentYear}/${currentMonth}`,
    }).then((res) => {
      setMonthSells(res.data[0].sum);
    });

    axios({
      method: "get",
      url: `${process.env.REACT_APP_URL_API}api/statistics/sums/price/sneakersSelling/month/${pastYear}/${pastMonth}`,
    }).then((res) => {
      setLastMonthSells(res.data[0].sum);
    });

    axios({
      method: "get",
      url: `${process.env.REACT_APP_URL_API}api/statistics/sums/shoe/buys/brandId/${currentYear}/${currentMonth}`,
    }).then((res) => setBrandBuyData(res.data));

    axios({
      method: "get",
      url: `${process.env.REACT_APP_URL_API}api/statistics/sums/shoe/buys/websiteId/${currentYear}/${currentMonth}`,
    }).then((res) => setwebsiteBuyData(res.data));

    axios({
      method: "get",
      url: `${process.env.REACT_APP_URL_API}api/statistics/sums/shoe/sales/resellWebsiteId/${currentYear}/${currentMonth}`,
    }).then((res) => setResellWebsiteData(res.data));
  }, []);

  console.log(resellWebsiteData);

  return (
    <div className="grid grid-cols-1 gap-3 p-5">
      <div>
        <h2 className="text-indigo-900 w-11/12 mx-auto font-bold text-xl">
          Récapitulatif du mois
        </h2>
        <div className="grid grid-cols-3">
          {monthExpensives && lastMonthExpensives && (
            <div className="col-start-1">
              <CardSum
                sum={monthExpensives}
                title={"Dépenses"}
                lastSumMonth={lastMonthExpensives}
                isOpen={isOpen}
              />
            </div>
          )}
          {monthBuys && lastMonthBuys && (
            <CardSum
              sum={monthBuys}
              title={"Achat"}
              lastSumMonth={lastMonthBuys}
              isOpen={isOpen}
            />
          )}
          {monthSells && lastMonthSells && (
            <CardSum
              sum={monthSells}
              title={"Vente"}
              lastSumMonth={lastMonthSells}
              isOpen={isOpen}
            />
          )}
        </div>
        <div className="grid grid-cols-3">
          {brandBuyData && brandBuyData.length > 0 && (
            <CardChart
              title="Marques"
              data={brandBuyData}
              isOpen={isOpen}
              labelTitle="Nombre d'achat(s)"
              type="brand"
            />
          )}
          {websiteBuyData && websiteBuyData.length > 0 && (
            <CardChart
              title="Site d'achat"
              data={websiteBuyData}
              isOpen={isOpen}
              labelTitle="Nombres d'achat(s)"
              type="website"
            />
          )}
          {resellWebsiteData && resellWebsiteData.length > 0 && (
            <CardChart
              title="Site de ventes"
              data={resellWebsiteData}
              isOpen={isOpen}
              labelTitle="Nombre de vente(s)"
              type="resellWebsite"
            />
          )}
        </div>
      </div>
      <div>
        <h2 className="text-indigo-900 w-11/12 mx-auto font-bold text-xl">
          Récapitulatif de l'année
        </h2>
        <div className="grid grid-cols-2">
          {totalShoe && totalShoeLastYear && (
            <div className="col-start-1">
              <CardSingleStat
                data={totalShoe}
                title={"Nombre d'achats total"}
                isOpen={isOpen}
              />
            </div>
          )}
          {totalShoeSold && totalShoeSoldLastYear && (
            <CardSingleStat
              data={totalShoeSold}
              title={"Nombre de ventes total"}
              isOpen={isOpen}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
