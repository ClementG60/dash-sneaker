import { useEffect, useState } from "react";
import { IGetSites, ISite } from "../interface/Interface";
import axios from "axios";

const GetSites = ({ type }: IGetSites) => {
    const [sites, setSites] = useState<Array<ISite>>();

    useEffect(() => {
        if (type === "reseller") {
            axios({
                method: "get",
                url: `${process.env.REACT_APP_URL_API}website/get-resell-websites`
            })
                .then(res => {
                    setSites(res.data);
                })
        } else if (type === "retailer") {
            axios({
                method: "get",
                url: `${process.env.REACT_APP_URL_API}website/get-websites`
            })
                .then(res => {
                    setSites(res.data);
                })
        }

    }, []);

    return (
        <div className="mt-6 w-11/12 mx-auto">
            <ul className="grid grid-cols-6 gap-4 text-center">
                {sites?.sort((a, b) => a.name.localeCompare(b.name)).map((site: ISite, index: number) => {
                    return (
                        <li key={index} className="p-3 bg-gradient-to-r from-purple-300 to-purple-200 font-bold text-slate-50 rounded-br-lg rounded-tl-lg">{site.name}</li>
                    )
                })
                }

            </ul>
        </div>
    );
};

export default GetSites;