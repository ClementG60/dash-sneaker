interface ITypeSelector {
    typeSelected: string;
    setTypeSelected: (value: string) => void;
  }

const TypeSelector = ({typeSelected, setTypeSelected}: ITypeSelector) => {
  return (
    <div className="w-full mb-3">
      <ul className="flex mx-auto w-4/12 justify-around text-indigo-900 font-medium">
        <li
          className={`w-1/2 cursor-pointer text-center border rounded-l-lg text-sm pt-1 pb-1 ${
            typeSelected === "buying" &&
            "bg-indigo-500 border-indigo-500 text-white font-bold"
          } duration-300 ease-in-out`}
          onClick={() => setTypeSelected("buying")}
        >
          Achat
        </li>
        <li
          className={`w-1/2 cursor-pointer text-center border rounded-r-lg text-sm pt-1 pb-1 ${
            typeSelected === "sales" &&
            "bg-indigo-500 border-indigo-500 text-white font-bold"
          } duration-300 ease-in-out`}
          onClick={() => setTypeSelected("sales")}
        >
          Vente
        </li>
      </ul>
    </div>
  );
};

export default TypeSelector;
