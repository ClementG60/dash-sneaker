import axios from "axios";
import { useEffect, useState } from "react";
import CardSum from "../../interface/componants/Card/CardSum";
import moment from "moment";
import { IChartData, IHome } from "../../domain/entities/Interface";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import CardChart from "../../interface/componants/Card/CardChart";
import CardSingleStat from "../../interface/componants/Card/CardSingleStat";
import CardSingleSkeleton from "../../interface/componants/Skeleton/CardSingleSkeleton";
import CardSumSkeleton from "../../interface/componants/Skeleton/CardSumSkeleton";
import CardChartSkeleton from "../../interface/componants/Skeleton/CardChartSkeleton";

ChartJS.register(ArcElement, Tooltip, Legend);

const Home = ({ isOpen }: IHome) => {
  const [totalShoe, setTotalShoe] = useState<number>();
  const [totalShoeSold, setTotalShoeSold] = useState<number>();
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

  const currentYear = moment().format("YYYY");
  const currentMonth = moment().format("MM");
  const lastDate = moment().subtract(1, "months").calendar();
  const pastMonth = moment(lastDate).format("MM");
  const pastYear = moment(lastDate).format("YYYY");

  const arrayRequest = [
    {
      uri: `api/statistics/buyings/general/year/${currentYear}`,
      type: "length",
      setter: setTotalShoe,
    },
    {
      uri: `api/statistics/sales/general/year/${currentYear}`,
      type: "length",
      setter: setTotalShoeSold,
    },
    {
      uri: `api/statistics/sums/price/expensives/month/${currentYear}/${currentMonth}`,
      type: "sum",
      setter: setMonthExpensives,
    },
    {
      uri: `api/statistics/sums/price/expensives/month/${pastYear}/${pastMonth}`,
      type: "sum",
      setter: setLastMonthExpensives,
    },
    {
      uri: `api/statistics/sums/price/sneakersBuying/month/${currentYear}/${currentMonth}`,
      type: "sum",
      setter: setMonthBuys,
    },
    {
      uri: `api/statistics/sums/price/sneakersBuying/month/${pastYear}/${pastMonth}`,
      type: "sum",
      setter: setLastMonthBuys,
    },
    {
      uri: `api/statistics/sums/price/sneakersSelling/month/${currentYear}/${currentMonth}`,
      type: "sum",
      setter: setMonthSells,
    },
    {
      uri: `api/statistics/sums/price/sneakersSelling/month/${pastYear}/${pastMonth}`,
      type: "sum",
      setter: setLastMonthSells,
    },
    {
      uri: `api/statistics/sums/shoe/buys/brandId/${currentYear}/${currentMonth}`,
      type: "data",
      setter: setBrandBuyData,
    },
    {
      uri: `api/statistics/sums/shoe/buys/websiteId/${currentYear}/${currentMonth}`,
      type: "data",
      setter: setwebsiteBuyData,
    },
    {
      uri: `api/statistics/sums/shoe/sales/resellWebsiteId/${currentYear}/${currentMonth}`,
      type: "data",
      setter: setResellWebsiteData,
    },
  ];

  useEffect(() => {
    arrayRequest.map((request) => {
      axios({
        method: "get",
        url: `${process.env.REACT_APP_URL_API + request.uri}`,
      }).then((res) => {
        request.type === "length" && request.setter(res.data.length);
        request.type === "sum" && request.setter(res.data[0].sum);
        request.type === "data" && request.setter(res.data);
      });
    });
  }, []);

  return (
    <div className="grid grid-cols-1 gap-3 p-5">
      <div>
        <h2 className="text-indigo-900 w-11/12 mx-auto font-bold text-xl">
          Récapitulatif du mois
        </h2>
        <div className="grid grid-cols-3">
          {monthExpensives && lastMonthExpensives ? (
            <div className="col-start-1">
              <CardSum
                sum={monthExpensives}
                title={"Dépenses"}
                lastSumMonth={lastMonthExpensives}
                isOpen={isOpen}
              />
            </div>
          ) : (
            <CardSumSkeleton isOpen={isOpen} />
          )}
          {monthBuys && lastMonthBuys ? (
            <CardSum
              sum={monthBuys}
              title={"Achat"}
              lastSumMonth={lastMonthBuys}
              isOpen={isOpen}
            />
          ) : (
            <CardSumSkeleton isOpen={isOpen} />
          )}
          {monthSells && lastMonthSells ? (
            <CardSum
              sum={monthSells}
              title={"Vente"}
              lastSumMonth={lastMonthSells}
              isOpen={isOpen}
            />
          ) : (
            <CardSumSkeleton isOpen={isOpen} />
          )}
        </div>
        <div className="grid grid-cols-3">
          {brandBuyData && brandBuyData.length > 0 ? (
            <CardChart
              title="Marques"
              data={brandBuyData}
              isOpen={isOpen}
              labelTitle="Nombre d'achat(s)"
              type="brand"
            />
          ) : (
            <CardChartSkeleton isOpen={isOpen} />
          )}
          {websiteBuyData && websiteBuyData.length > 0 ? (
            <CardChart
              title="Site d'achat"
              data={websiteBuyData}
              isOpen={isOpen}
              labelTitle="Nombres d'achat(s)"
              type="website"
            />
          ) : (
            <CardChartSkeleton isOpen={isOpen} />
          )}
          {resellWebsiteData && resellWebsiteData.length > 0 ? (
            <CardChart
              title="Site de ventes"
              data={resellWebsiteData}
              isOpen={isOpen}
              labelTitle="Nombre de vente(s)"
              type="resellWebsite"
            />
          ) : (
            <CardChartSkeleton isOpen={isOpen} />
          )}
        </div>
      </div>
      <div>
        <h2 className="text-indigo-900 w-11/12 mx-auto font-bold text-xl">
          Récapitulatif de l'année
        </h2>
        <div className="grid grid-cols-2">
          {totalShoe ? (
            <div className="col-start-1">
              <CardSingleStat
                data={totalShoe}
                title={"Nombre d'achats total"}
                isOpen={isOpen}
              />
            </div>
          ) : (
            <CardSingleSkeleton isOpen={isOpen} />
          )}
          {totalShoeSold ? (
            <CardSingleStat
              data={totalShoeSold}
              title={"Nombre de ventes total"}
              isOpen={isOpen}
            />
          ) : (
            <CardSingleSkeleton isOpen={isOpen} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
