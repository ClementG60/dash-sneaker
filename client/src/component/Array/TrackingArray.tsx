import { useState } from "react";
import { useAppSelector } from "../../app/hooks";
import AddIcon from "@mui/icons-material/Add";
import Modal from "../Modal";
import { ITracking } from "../../interface/Interface";
import TrackingArrayLine from "./TrackingArrayLine";
import { FiRefreshCw } from "react-icons/fi";

const TrackingArray = () => {
  const trackings = useAppSelector((state) => state.trackings.trackings);
  const [openFormTracking, setOpenFormTracking] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<boolean>(true);

  const ths: Array<string> = [
    "Transporteur",
    "Numéro de suivi",
    "Statut",
    "Date",
    "",
  ];
  return (
    <>
      <div className="mx-12 mb-5 flex justify-between">
        <button
          className="flex bg-indigo-500 text-white font-bold rounded my-auto hover:rotate-90 hover:scale-110 duration-300 cursor-pointer"
          onClick={() => {
            setOpenFormTracking(!openFormTracking);
          }}
        >
          <AddIcon />
        </button>
        <button className="flex bg-indigo-500 text-white font-bold rounded my-auto hover:rotate-180 hover:scale-110 duration-300 cursor-pointer p-1">
          <FiRefreshCw onClick={() => setRefresh(true)}/>
        </button>
      </div>
      <table className="border-collapse table-auto w-11/12 text-center mx-auto">
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
          {trackings.map((tracking: ITracking, index: number) => {
            return <TrackingArrayLine key={index} tracking={tracking} refresh={refresh} setRefresh={setRefresh}/>;
          })}
        </tbody>
      </table>
      {openFormTracking && (
        <Modal
          setOpenModal={setOpenFormTracking}
          model={"tracking"}
          id={"none"}
        />
      )}
    </>
  );
};

export default TrackingArray;
