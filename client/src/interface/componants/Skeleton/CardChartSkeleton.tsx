import Skeleton from "react-loading-skeleton";
import { IOpen } from "../../../domain/entities/Interface";

const CardChartSkeleton = ({ isOpen }: IOpen) => {
  return (
    <div
      className={`bg-white rounded-[16px] ${
        isOpen ? "w-11/12" : "w-9/12"
      } 2xl:w-6/12
      mx-auto mt-2 p-6 h-30 drop-shadow-xl hover:drop-shadow-2xl duration-300`}
    >
      <p className="mb-3 mx-auto">
        <Skeleton />
      </p>
      <div className="flex flex-col items-center w-full">
        <Skeleton circle height={160} width={160} />
        <p className="mt-2">
          <Skeleton width={60} />
        </p>
      </div>
    </div>
  );
};

export default CardChartSkeleton;
