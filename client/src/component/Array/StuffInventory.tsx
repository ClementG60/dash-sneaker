import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { deleteStuff, setStuffs } from "../../feature/stuffsSlice";
import TypeSelector from "../Part/TypeSelector";

const StuffInventory = () => {
  const stuffs = useAppSelector(
    (state: { stuffs: { stuffs: any } }) => state.stuffs.stuffs
  );
  const websites = useAppSelector(
    (state: { websites: { websites: any } }) => state.websites.websites
  );
  const resellWebsites = useAppSelector(
    (state: { resellWebsites: { websites: any } }) =>
      state.resellWebsites.websites
  );
  const [openFormStuff, setOpenFormStuff] = useState<boolean>(false);
  const [id, setId] = useState<string>();
  const [typeSelected, setTypeSelected] = useState<string>("buying");
  const [date, setDate] = useState(moment());
  const dispatch = useAppDispatch();

  const year = moment(date).format("YYYY");
  const month = moment(date).format("MM");

  const handleDeleteStuff = (id: string) => {
    axios({
      method: "delete",
      url: `${process.env.REACT_APP_URL_API}api/sneaker/delete/${id}`,
    })
      .then((res) => {
        dispatch(deleteStuff(id));
        toast.success("La paire a bien été supprimé.", {
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

  const handleUpdate = (id: string) => {
    setOpenFormStuff(!openFormStuff);
    setId(id);
  };

  useEffect(() => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_URL_API}api/sneaker/get-by-month/${typeSelected}/${month}/${year}`,
    }).then((res) => dispatch(setStuffs(res.data)));
  }, [month, year, typeSelected, dispatch]);

  const thsBuying: Array<string> = [
    "Nom",
    "Type",
    "Couleur",
    "Taille",
    "Site d'achat",
    "Prix d'achat",
    "Date d'achat",
    "Actions",
  ];

  const thsSales: Array<string> = [
    "Nom",
    "Type",
    "Couleur",
    "Taille",
    "Site de vente",
    "Prix de vente",
    "Date de vente",
    "Profit",
    "Actions",
  ];
  return (
    <>
      <TypeSelector
        typeSelected={typeSelected}
        setTypeSelected={setTypeSelected}
      />
    </>
  );
};

export default StuffInventory;
