import { IModal } from "../interface/Interface";
import CloseIcon from "@mui/icons-material/Close";
import FormSneaker from "./FormSneaker";

const Modal = ({ setOpenModal }: IModal) => {
  return (
    <div className="fixed z-10 bg-transparent/75 mx-auto p-6 top-0 left-0 h-full w-full">
      <div className="bg-white w-5/6 h-1/2 opacity-100 mx-auto p-2 h-auto">
        <div
          className="cursor-pointer text-right mb-3"
          onClick={() => {
            setOpenModal(false);
          }}
        >
          <CloseIcon />
        </div>
        <FormSneaker update={true}/>
      </div>
    </div>
  );
};

export default Modal;
