import { ICardSingleStat } from "../../interface/Interface";

const CardSingleStat = ({ data, title, isOpen }: ICardSingleStat) => {
    return (
<div
      className={`bg-white rounded-[16px] ${
        isOpen ? "w-11/12" : "w-9/12"
      } 2xl:w-6/12
      mx-auto mt-2 p-6 h-30 drop-shadow-xl hover:drop-shadow-2xl duration-300`}
    >
      <p className="text-lg font-bold text-indigo-900">{title}</p>
      <div className="flex items-center mt-3">
        <p className="text-5xl font-bold text-indigo-600">{data}</p>
      </div>
    </div>
    );
};

export default CardSingleStat;