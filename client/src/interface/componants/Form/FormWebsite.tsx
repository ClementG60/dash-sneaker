import { IAddSite } from "../../../domain/entities/Interface";
import { createRef, useState } from "react";
import axios from "axios";
import { useAppDispatch } from "../../../app/hooks";
import {
  addWebsite,
  setWebsites,
} from "../../../domain/usecases/websitesSlice";
import {
  addResellWebsite,
  setResellWebsites,
} from "../../../domain/usecases/resellWebsitesSlice";
import { toast } from "react-toastify";
import { addWebsiteAPI, getWebsitesAPI } from "../../../infrastructure/WebsiteAPI";

const FormWebsite = ({ type }: IAddSite) => {
  const [website, setWebsite] = useState<string>();
  const submitButton = createRef<HTMLInputElement>();
  const dispatch = useAppDispatch();

  const handleAddWebsite = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      type: type,
      name: website,
      img: `./assets/img/${website}`,
    };

    addWebsiteAPI(data)
      .then((res) => {
        if (type === "website") {
          dispatch(addWebsite(data));
          getWebsitesAPI("websites").then((res) =>
            dispatch(setWebsites(res.data))
          );
        } else {
          dispatch(addResellWebsite(data));
          getWebsitesAPI("resell-websites").then((res) =>
            dispatch(setResellWebsites(res.data))
          );
        }
        setWebsite("");
      })
      .catch((err) =>
        toast.error(err.response.data.message, {
          position: "bottom-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      );
  };

  return (
    <div className="mt-5 w-11/12 mx-auto border-t-2 text-center">
      <form
        action=""
        onSubmit={(e) => handleAddWebsite(e)}
        className="grid grid-cols-1 w-3/6 mx-auto mt-3"
      >
        <input
          type="text"
          name="website"
          id="website"
          className="bg-gray-200 appearance-none rounded border-2 border-gray-200 w-full h-full py-2 px-4 focus:border-indigo-500 focus:outline-none focus:bg-white"
          onChange={(e) => setWebsite(e.target.value)}
          value={website}
          placeholder="Site à ajouter"
        />
        <input
          type="submit"
          value="Ajouter"
          className="cursor-pointer col-span-3 mt-3 rounded-md bg-indigo-500 text-white w-1/6 mx-auto py-3 text-md"
          ref={submitButton}
        />
      </form>
    </div>
  );
};

export default FormWebsite;
