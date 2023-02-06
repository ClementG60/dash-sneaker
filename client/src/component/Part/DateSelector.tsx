import { IDateSelector } from "../../interface/Interface";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import moment from "moment";

const DateSelector = ({ date, setDate }: IDateSelector) => {  
  return (
    <div className="flex w-3/12 text-indigo-900 items-center justify-end">
      <div className="flex mr-4 text-lg">
        <span className="rounded hover:bg-slate-300 hover:scale-110 cursor-pointer">
          <MdOutlineKeyboardArrowLeft
            onClick={() => setDate(moment(date).subtract(1, "months"))}
          />
        </span>
        <span
          className={`rounded hover:bg-slate-300 hover:scale-110 duration-300 cursor-pointer`}
          onClick={() => setDate(moment(date).add(1, "months"))}
        >
          <MdOutlineKeyboardArrowRight />
        </span>
      </div>
      <p className="w-6/12 font-semibold cursor-default">{date.format("MMMM YYYY")}</p>
    </div>
  );
};

export default DateSelector;
