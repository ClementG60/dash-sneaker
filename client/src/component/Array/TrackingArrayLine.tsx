import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../app/hooks";
import { deleteTracking } from "../../feature/trackingsSlice";
import { ITrackingArrayLine } from "../../interface/Interface";

const TrackingArrayLine = ({
  tracking,
  refresh,
  setRefresh,
  setIsLoading,
}: ITrackingArrayLine) => {
  //state
  const [status, setStatus] = useState<string>();
  const [dateStatus, setDateStatus] = useState<string>();

  //redux
  const dispatch = useAppDispatch();

  /* fonction permettant de supprimer un suivi
  @id : id du suivi à supprimer
  @return : 
    - message de succès
    - message d'erreur
  */
  const handleDeleteTracking = (id: string) => {
    axios({
      method: "delete",
      url: `${process.env.REACT_APP_URL_API}api/sneaker/delete/${id}`,
    })
      .then((res) => {
        dispatch(deleteTracking(id));
        toast.success("Le numéro de suivi a bien été supprimé.", {
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

  /* hook permet de rafraichir les trackings suivant les transporteurs
  @dépendence : refresh
  @return : statut, date du statut
  */
  useEffect(() => {
    // tracking.transporter === "UPS" &&
    //   axios({
    //     method: "get",
    //     headers: {
    //       AccessLicenseNumber: `${process.env.REACT_APP_UPS_KEY}`,
    //       "Content-Type": "application/json",
    //       Accept: "application/json",
    //     },
    //     url: `https://onlinetools.ups.com/track/v1/details/${tracking.trackingNumber}?locale=fr_FR`,
    //   }).then((res) => {
    //     setStatus(res.data.shipment.event[0].label);
    //   });
    if (refresh) {
      tracking.transporter === "Chronopost" &&
        axios({
          method: "get",
          headers: {
            "X-Okapi-Key": `${process.env.REACT_APP_CHRONOPOST_KEY}`,
            Accept: "application/json",
          },
          url: `https://api.laposte.fr/suivi/v2/idships/${tracking.trackingNumber}?lang=fr_FR`,
        }).then((res) => {
          setStatus(res.data.shipment.event[0].label);
          setDateStatus(
            moment(res.data.shipment.event[0].date).format("DD/MM/YYYY HH:mm")
          );
          setIsLoading(false);
        });

      tracking.transporter === "DHL" &&
        axios({
          method: "get",
          headers: {
            "DHL-API-Key": `${process.env.REACT_APP_DHL_KEY}`,
            Accept: "application/json",
          },
          url: `https://api-eu.dhl.com/track/shipments?trackingNumber=9481557304&service=express`,
        }).then((res: any) => {
          setStatus(res.data.shipments[0].status.statusCode);
          setDateStatus(
            moment(res.data.shipments[0].status.timestamp).format(
              "DD/MM/YYYY HH:mm"
            )
          );
        });
      setRefresh(false);
      setIsLoading(false);
    }
  }, [refresh]);

  return (
    <tr className="border-b text-sm text-indigo-900 font-medium">
      <td className="py-4">
        <div className="cursor-pointer text-lg px-1">
          <p>{tracking.transporter}</p>
        </div>
      </td>
      <td>
        <div className="cursor-pointer text-lg px-1">
          <p>{tracking.trackingNumber}</p>
        </div>
      </td>
      <td>
        <div className="cursor-pointer text-lg px-1">
          <p>{status}</p>
        </div>
      </td>
      <td>
        <div className="cursor-pointer text-lg px-1">
          <p>{dateStatus}</p>
        </div>
      </td>
      <td>
        <div
          className="cursor-pointer text-lg px-1"
          onClick={() => handleDeleteTracking(tracking._id)}
        >
          <FaTrash />
        </div>
      </td>
    </tr>
  );
};

export default TrackingArrayLine;
