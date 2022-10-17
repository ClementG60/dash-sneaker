import { IGetSites } from "../interface/Interface";
import { useState } from "react";
import { AxiosError, AxiosResponse } from "axios";
import axios from "axios";
import { useAppDispatch } from "../app/hooks";
import { addWebsite, setWebsites } from "../feature/websitesSlice";
import { addResellWebsite, setResellWebsites } from "../feature/resellWebsitesSlice";

const AddWebsite = ({ type }: IGetSites) => {
    const [website, setWebsite] = useState<string>();
    const dispatch = useAppDispatch();

    const handleAddWebsite = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const data = {
            "name": website,
            "img": `./assets/img/${website}`
        }

        axios.post(`${process.env.REACT_APP_URL_API}website/add-${type}`,data)
        .then((res) => {
            if (type === "website") {
                dispatch(addWebsite(data));
                axios({
                    method: "get",
                    url: `${process.env.REACT_APP_URL_API}website/get-websites`
                })
                    .then(res => dispatch(setWebsites(res.data)));
                
            } else {
                dispatch(addResellWebsite(data));
                axios({
                    method: "get",
                    url: `${process.env.REACT_APP_URL_API}website/get-resell-websites`
                })
                    .then(res => dispatch(setResellWebsites(res.data)));
            }
        })
        .catch((err) => console.log(err))
    };   

    return (
        <div className="mt-5 w-11/12 mx-auto border-t-2 text-center">
            <form action="" onSubmit={(e) => handleAddWebsite(e)} className="grid grid-cols-1 w-3/6 mx-auto mt-3">
                <input type="text" name="website" id="website" className="py-2 px-2 border rounded-md w-3/6 mx-auto focus:outline-none focus:border-zinc-400 focus:border-1" onChange={(e) => setWebsite(e.target.value)} value={website} placeholder="Site à ajouter"/>
                <input type="submit" value="Ajouter" className="cursor-pointer col-span-2 mt-3 rounded-md bg-gradient-to-r from-purple-300 to-purple-200 text-white w-2/6 mx-auto py-3 text-md hover:font-bold"/>
            </form>
        </div>
    );
};

export default AddWebsite;