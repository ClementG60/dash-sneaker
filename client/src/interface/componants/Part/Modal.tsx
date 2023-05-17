import { IModal } from "../../../domain/entities/Interface";
import CloseIcon from "@mui/icons-material/Close";
import FormSneaker from "../Form/FormSneaker";
import FormExpensive from "../Form/FormExpensive";
import FormTracking from "../Form/FormTracking";
import FormStuff from "../Form/FormStuff";

const Modal = ({ setOpenModal, model, id, typeSelected }: IModal) => {
  return (
    <div className="fixed z-10 bg-transparent/50 mx-auto p-6 top-0 left-0 h-full w-full">
      <div className="bg-slate-100 w-5/6 h-1/2 opacity-100 mx-auto p-6 rounded-xl">
        <div
          className="cursor-pointer flex flex-row-reverse mb-3"
          onClick={() => {
            setOpenModal(false);
          }}
        >
          <span className="p-1 rounded-md flex bg-zinc-200 hover:scale-110 duration-300">
            <CloseIcon className="" />
          </span>
        </div>
        {model === "sneakers" && <FormSneaker id={id} setOpenModal={setOpenModal} typeSelected={typeSelected}/>}
        {model === "expensives" && <FormExpensive />}
        {model === "tracking" && <FormTracking />}
        {model === "stuffs" && <FormStuff id={id} setOpenModal={setOpenModal} typeSelected={typeSelected} />}
      </div>
    </div>
  );
};

export default Modal;
