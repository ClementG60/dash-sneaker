import AddIcon from "@mui/icons-material/Add";

interface IAddButoon {
    openForm: boolean;
    setOpenForm: (value: boolean) => void;
    setId: (value: string) => void;
  }

const AddButton = ({openForm, setOpenForm, setId}: IAddButoon) => {
    return (
        <button
          className="flex bg-indigo-500 text-white font-bold rounded my-auto hover:rotate-90 hover:scale-110 duration-300 cursor-pointer"
          onClick={() => {
            setOpenForm(!openForm);
            setId("none");
          }}
        >
          <AddIcon />
        </button>
    );
};

export default AddButton;