import { IGetSites } from "../interface/Interface";
import { useState } from "react";
import { AxiosError, AxiosResponse } from "axios";
import axios from "axios";

const AddWebsite = ({ type }: IGetSites) => {
    const [website, setWebsite] = useState<string>();

    const handleAddWebsite = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        axios({
            method: "post",
            url: `${process.env.REACT_APP_URL_API}website/add-${type}`,
            data: {
                "name": website,
                "img": `./assets/img/${website}`
            }
        })
        .then((res) => window.location.reload())
        .catch((err) => console.log(err))
    };    

    return (
        <div className="mt-5">
            <form action="" onSubmit={(e) => handleAddWebsite(e)}>
                <label htmlFor="website">Site</label>
                <input type="text" name="website" id="website" onChange={(e) => setWebsite(e.target.value)} value={website}/>
                <input type="submit" value="Ajouter" />
            </form>
        </div>
    );
};

export default AddWebsite;