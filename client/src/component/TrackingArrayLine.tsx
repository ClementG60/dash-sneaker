import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { ITrackingArrayLine } from "../interface/Interface";

const TrackingArrayLine = ({ tracking, refresh, setRefresh }: ITrackingArrayLine) => {
  const [status, setStatus] = useState<string>();
  const [dateStatus, setDateStatus] = useState<string>();

  useEffect(() => {
    // tracking.transporter === "UPS" &&
    //   axios({
    //     method: "get",
    //     headers: {
    //       transId: "1234",
    //       transactionSrc: "Test",
    //       Username: "clementglm",
    //       AccessLicenseNumber: "EDC413CD8D67CEB5",
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
            "X-Okapi-Key":
              "N00v7Z+oyII2QpUYLvk2u+XC0JRDaY1m9Oze+f8olCARJTw3KcgXuaLMNF4c/Pel",
            Accept: "application/json",
          },
          url: `https://api.laposte.fr/suivi/v2/idships/${tracking.trackingNumber}?lang=fr_FR`,
        }).then((res) => {
          setStatus(res.data.shipment.event[0].label);
          setDateStatus(
            moment(res.data.shipment.event[0].date).format("DD/MM/YYYY HH:mm")
          );
        });

      tracking.transporter === "DHL" &&
        axios({
          method: "get",
          headers: {
            "DHL-API-Key": "iGyf9NPdiMED10IQqW7TseS6Y3MAb1CX",
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
        <div className="cursor-pointer text-lg px-1">
          <FaTrash />
        </div>
      </td>
    </tr>
  );
};

export default TrackingArrayLine;
