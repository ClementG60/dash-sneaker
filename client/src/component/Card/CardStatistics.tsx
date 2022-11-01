import React from "react";
import { ICardBooking } from "../../interface/Interface";

const CardStatistics = ({ sum, title, lastSumMonth, isOpen }: ICardBooking) => {
  return (
    <div
      className={`bg-white rounded-[16px] ${
        isOpen ? "w-11/12" : "w-9/12"
      } 2xl:w-6/12
      mx-auto mt-2 p-6 h-30 drop-shadow-xl hover:drop-shadow-2xl duration-300`}
    >
      <p className="text-lg font-bold">{title}</p>
      <div className="flex items-center mt-3">
        <p className="text-5xl font-bold text-indigo-900">{sum} €</p>
        <p className="ml-6 text-indigo-300 text-sm font-bold">
          {(((sum - lastSumMonth) / lastSumMonth) * 100).toFixed(2)} %
        </p>
      </div>
    </div>
  );
};

export default CardStatistics;
