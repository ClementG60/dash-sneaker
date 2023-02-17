import { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Modal from "../Modal";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import { IExpensive } from "../../interface/Interface";
import { dateParser } from "../Utils";
import axios from "axios";
import moment from "moment";
import { setExpensives, deleteExpensive } from "../../feature/expensiveSlice";
import DateSelector from "../Part/DateSelector";

const ExpensiveInventory = () => {
  const expensives = useAppSelector((state) => state.expensives.expensives);
  const [openFormExpensive, setOpenFormExpensive] = useState<boolean>(false);
  const [date, setDate] = useState(moment());
  const dispatch = useAppDispatch();

  const ths: Array<string> = ["Nom", "Type", "Date", "Prix", ""];

  const handleDeleteExpensive = (id: string) => {
    axios({
      method: "delete",
      url: `${process.env.REACT_APP_URL_API}api/expensive/delete/${id}`,
    })
      .then((res) => {
        dispatch(deleteExpensive(id));
        toast.success("La dépense a bien été supprimée.", {
          position: "bottom-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((err) => {
        toast.error("Une erreur est survenue. Veuillez recommencez.", {
          position: "bottom-right",
          autoClose: 2500,
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
      url: `${process.env.REACT_APP_URL_API}api/expensive/get-by-month/${month}/${year}`,
    }).then((res) => dispatch(setExpensives(res.data)));
  }, [month, year, dispatch]);
  return (
    <>
      <div className="mx-12 mb-5 flex justify-between">
        <button
          className="flex bg-indigo-500 text-white font-bold rounded my-auto hover:rotate-90 hover:scale-110 duration-300 cursor-pointer"
          onClick={() => setOpenFormExpensive(!openFormExpensive)}
        >
          <AddIcon />
        </button>
        <DateSelector date={date} setDate={setDate} />
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
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {openFormExpensive && (
        <Modal
          setOpenModal={setOpenFormExpensive}
          model={"expensives"}
          id={"none"}
        />
      )}
    </>
  );
};

export default ExpensiveInventory;
