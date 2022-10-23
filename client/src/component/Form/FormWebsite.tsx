import { IGetSites } from "../../interface/Interface";
import { useState } from "react";
import { AxiosError, AxiosResponse } from "axios";
import axios from "axios";
import { useAppDispatch } from "../../app/hooks";
import { addWebsite, setWebsites } from "../../feature/websitesSlice";
import {
  addResellWebsite,
  setResellWebsites,
} from "../../feature/resellWebsitesSlice";

const AddWebsite = ({ type }: IGetSites) => {
  const [website, setWebsite] = useState<string>();
  const dispatch = useAppDispatch();

  const handleAddWebsite = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      name: website,
      img: `./assets/img/${website}`,
    };

    axios
      .post(`${process.env.REACT_APP_URL_API}website/add-${type}`, data)
      .then((res) => {
        if (type === "website") {
          dispatch(addWebsite(data));
          axios({
            method: "get",
            url: `${process.env.REACT_APP_URL_API}website/get-websites`,
          }).then((res) => dispatch(setWebsites(res.data)));
        } else {
          dispatch(addResellWebsite(data));
          axios({
            method: "get",
            url: `${process.env.REACT_APP_URL_API}website/get-resell-websites`,
          }).then((res) => dispatch(setResellWebsites(res.data)));
        }
      })
      .catch((err) => console.log(err));
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
          className="cursor-pointer col-span-3 mt-3 rounded-md bg-indigo-500 text-white w-1/6 mx-auto py-3 text-md hover:bg-indigo-400"
          />
      </form>
    </div>
  );
};

export default AddWebsite;
