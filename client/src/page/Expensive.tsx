import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import FormExpensive from "../component/Form/FormExpensive";

const Expensive = () => {
  const [openFormExpensive, setOpenFormExpensive] = useState<boolean>(false);
  return (
    <>
      <div className="mx-12 mb-5 flex justify-between">
        <button
          className="bg-purple-700 text-white font-bold p-3 flex items-center"
          onClick={() => setOpenFormExpensive(!openFormExpensive)}
        >
          <AddIcon />
          Ajouter une dépense
        </button>
      </div>
      {openFormExpensive && (
        <FormExpensive />
      )}
    </>
  );
};

export default Expensive;
