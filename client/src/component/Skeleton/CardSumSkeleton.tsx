import React from "react";
import Skeleton from "react-loading-skeleton";
import { IOpen } from "../../interface/Interface";

const CardSumSkeleton = ({ isOpen }: IOpen) => {
  return (
    <div
      className={`bg-white rounded-[16px] ${
        isOpen ? "w-11/12" : "w-9/12"
      } 2xl:w-6/12
      mx-auto mt-2 p-6 h-30 drop-shadow-xl hover:drop-shadow-2xl duration-300`}
    >
      <p>
        <Skeleton />
      </p>
      <div className="flex items-center mt-3">
        <p>
          <Skeleton width={50} height={50}/>
        </p>
        <p className="ml-6">
          <Skeleton width={30}/>
        </p>
      </div>
    </div>
  );
};

export default CardSumSkeleton;
