import React from "react";
import { ICardBooking } from "../../interface/Interface";

const CardStatistics = ({ sum, title, lastSumMonth }: ICardBooking) => {
  return (
    <div className="bg-white rounded-[16px] w-8/12 mx-auto mt-2 p-6 h-30 drop-shadow-xl hover:drop-shadow-2xl duration-300">
      <p className="text-lg font-bold">{title}</p>
      <p className="text-5xl font-bold mt-3 text-indigo-900">{sum} €</p>
      <p>{((sum - lastSumMonth) / lastSumMonth) * 100} %</p>
    </div>
  );
};

export default CardStatistics;
