import { createRef, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import AddIcon from "@mui/icons-material/Add";
import Modal from "../Part/Modal";
import { ITracking } from "../../interface/Interface";
import TrackingArrayLine from "./TrackingArrayLine";
import { FiRefreshCw } from "react-icons/fi";
import { toast } from "react-toastify";
import gsap from "gsap";

const TrackingArray = () => {
  //redux
  const trackings = useAppSelector((state) => state.trackings.trackings);
  //state
  const [openFormTracking, setOpenFormTracking] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<boolean>(true);
  const refreshButton = createRef<HTMLButtonElement>();

  const ths: Array<string> = [
    "Transporteur",
    "Numéro de suivi",
    "Statut",
    "Date",
    "",
  ];

  /* fonction permettant de refresh les suivis
  @return : 
    - message de succès
  */
  const handleUpdateTracking = () => {
    setRefresh(true);
    toast.success("Les suivis ont été mis à jour.", {
      position: "bottom-right",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    animationHoverButtonOff();
  };

  //fonction d'animation sur le bouton de refresh (hover)
  const animationHoverButton = () => {
    gsap.to(refreshButton.current, {
      rotation: 180,
      scale: 1.2,
      duration: 0.2,
      ease: "power0",
    });
  };

  //fonction d'animation sur le bouton de refresh (hover out)
  const animationHoverButtonOff = () => {
    gsap.to(refreshButton.current, {
      rotation: "0_cw",
      scale: 1,
      duration: 0.2,
      ease: "power0",
    });
  };

  return (
    <>
      <div className="mx-12 mb-5 flex justify-between">
        <button
          className="flex bg-indigo-500 text-white font-bold rounded hover:rotate-90 hover:scale-110 my-auto duration-300 cursor-pointer"
          onClick={() => {
            setOpenFormTracking(!openFormTracking);
          }}
        >
          <AddIcon />
        </button>
        <button
          className="flex bg-indigo-500 text-white font-bold rounded my-auto duration-300 cursor-pointer p-1"
          ref={refreshButton}
          onMouseEnter={() => animationHoverButton()}
          onMouseLeave={() => animationHoverButtonOff()}
        >
          <FiRefreshCw onClick={() => handleUpdateTracking()} />
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
            return (
              <TrackingArrayLine
                key={index}
                tracking={tracking}
                refresh={refresh}
                setRefresh={setRefresh}
              />
            );
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
