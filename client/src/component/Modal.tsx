import { IModal } from "../interface/Interface";
import CloseIcon from "@mui/icons-material/Close";
import FormSneaker from "./Form/FormSneaker";
import FormExpensive from "./Form/FormExpensive";

const Modal = ({ setOpenModal, type }: IModal) => {
  return (
    <div className="fixed z-10 bg-transparent/50 mx-auto p-6 top-0 left-0 h-full w-full">
      <div className="bg-slate-100 w-5/6 h-1/2 opacity-100 mx-auto p-6 h-auto rounded-xl">
        <div
          className="cursor-pointer flex flex-row-reverse mb-3"
          onClick={() => {
            setOpenModal(false);
          }}
        >
          <span className="p-1 rounded-md flex bg-zinc-200 hover:scale-110 duration-300"><CloseIcon className=""/></span>
          
        </div>
        {type === "sneakers" &&<FormSneaker/>}
        {type === "expensives" &&<FormExpensive/>}
      </div>
    </div>
  );
};

export default Modal;
