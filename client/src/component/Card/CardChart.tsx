
import { Doughnut } from "react-chartjs-2";
import { useAppSelector } from "../../app/hooks";
import { IBrand, IChartData, ICardChart } from "../../interface/Interface";

const CardChart = ({ title, isOpen, data, type, labelTitle }: ICardChart) => {
  const brands = useAppSelector((state) => state.brands.brands);
  const websites = useAppSelector((state) => state.websites.websites);
  const resellWebsites = useAppSelector(
    (state) => state.resellWebsites.websites
  );

  let label: number[] = [];
  let labels: string[] = [];
  let count = 0;

  type === "brand" &&
    data.map((data: IChartData) => {
      brands?.map((brand: IBrand) => {
        if (data?._id === brand._id) labels.push(brand.name);
      });
      label.push(data.count);
    });

  type === "website" &&
    data.map((data: IChartData) => {
      websites?.map((website: IBrand) => {
        if (data?._id === website._id) labels.push(website.name);
      });
      label.push(data.count);
    });

  type === "resellWebsite" &&
    data.map((data: IChartData) => {
      resellWebsites?.map((resellWebsite: IBrand) => {
        if (data?._id === resellWebsite._id) labels.push(resellWebsite.name);
      });
      label.push(data.count);
    });

  label.map((data) => {
    count += data;
  });

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: labelTitle,
        data: label,
        backgroundColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
      },
    ],
  };

  return (
    <div
      className={`bg-white rounded-[16px] ${
        isOpen ? "w-11/12" : "w-9/12"
      } 2xl:w-6/12
      mx-auto mt-2 p-6 h-30 drop-shadow-xl hover:drop-shadow-2xl duration-300`}
    >
      <p className="text-lg font-bold mb-3 text-indigo-900">{title}</p>
      {<Doughnut data={chartData} />}
      <p className="text-indigo-900 text-sm text-center mt-2">Total : {count}</p>
    </div>
  );
};

export default CardChart;
