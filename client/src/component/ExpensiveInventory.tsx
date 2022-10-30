import { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import Modal from "./Modal";
import { FaTrash } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import { IExpensive } from "../interface/Interface";
import { dateParser } from "./Utils";
import axios from "axios";
import { deleteSneaker } from "../feature/sneakersSlice";
import moment from "moment";
import { setExpensives } from "../feature/expensiveSlice";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";

const ExpensiveInventory = () => {
  const expensives = useAppSelector((state) => state.expensives.expensives);
  const [openFormExpensive, setOpenFormExpensive] = useState<boolean>(false);
  const [date, setDate] = useState(moment());
  const dispatch = useAppDispatch();

  const ths: Array<string> = ["Nom", "Type", "Date", "Prix", ""];

  const handleDeleteExpensive = (id: string) => {
    axios({
      method: "delete",
      url: `${process.env.REACT_APP_URL_API}expensive/delete/${id}`,
    })
      .then((res) => {
        dispatch(deleteSneaker(id));
        toast.success("La dépense a bien été supprimée.", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((err) => {
        console.log(err);
        toast.error("Une erreur est survenue. Veuillez recommencez.", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  const year = moment(date).format("YYYY");
  const month = moment(date).format("MM");

  useEffect(() => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_URL_API}expensive/get-by-month/${month}/${year}`,
    }).then((res) => dispatch(setExpensives(res.data)));
  }, [month, year]);
  return (
    <>
      <div className="mx-12 mb-5 flex justify-between">
        <button
          className="flex bg-indigo-500 text-white font-bold rounded my-auto hover:rotate-180 duration-300 cursor-pointer"
          onClick={() => setOpenFormExpensive(!openFormExpensive)}
        >
          <AddIcon />
        </button>
        <div className="flex w-1/6 items-center justify-around">
          <div className="flex mr-4 text-lg">
            <span className="rounded hover:bg-slate-300 hover:scale-110 cursor-pointer">
              <MdOutlineKeyboardArrowLeft
                onClick={() => setDate(moment(date).subtract(1, "months"))}
              />
            </span>
            <span
              className="rounded hover:bg-slate-300 hover:scale-110 duration-300 cursor-pointer"
              onClick={() => setDate(moment(date).add(1, "months"))}
            >
              <MdOutlineKeyboardArrowRight />
            </span>
          </div>
          <p className="w-10/12">{date.format("MMMM YYYY")}</p>
        </div>
      </div>
      <div>
        <table className="border-collapse table-auto w-10/12 text-center mx-auto">
          <thead className="bg-slate-200 rounded-lg uppercase text-xs tracking-wide">
            <tr>
              {ths.map((th: string, index: number) => {
                return (
                  <th key={index} className="py-4 text-slate-400">
                    {th}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {expensives.map((expensive: IExpensive, index: number) => {
              return (
                <tr
                  key={index}
                  className="border-b text-sm text-indigo-900 font-medium"
                >
                  <td className="py-4">{expensive.name}</td>
                  <td>{expensive.type}</td>
                  <td>{dateParser(expensive.date)}</td>
                  <td>{expensive.price} €</td>
                  <td>
                    <div
                      className="flex justify-center cursor-pointer text-lg text-center"
                      onClick={() => handleDeleteExpensive(expensive._id)}
                    >
                      <FaTrash />
                      <ToastContainer />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {openFormExpensive && (
          <Modal setOpenModal={setOpenFormExpensive} type={"expensives"} />
        )}
      </div>
    </>
  );
};

export default ExpensiveInventory;
