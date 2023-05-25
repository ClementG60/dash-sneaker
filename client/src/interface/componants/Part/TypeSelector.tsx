interface ITypeSelector {
  data: Array<{ name: string; type: string }>;
  typeSelected: string;
  setTypeSelected: (value: string) => void;
}

const TypeSelector = ({
  typeSelected,
  setTypeSelected,
  data,
}: ITypeSelector) => {
  return (
    <div className="w-full mb-3">
      <ul className="flex mx-auto w-4/12 justify-around text-indigo-900 font-medium">
        {data.map((value, index) => {
          return (
            <li
              key={index}
              className={`w-1/2 cursor-pointer text-center border ${
                index === 0
                  ? "rounded-l-lg"
                  : index === data.length - 1
                  ? "rounded-r-lg"
                  : null
              } text-sm pt-1 pb-1 ${
                typeSelected === value.type &&
                "bg-indigo-500 border-indigo-500 text-white font-bold"
              } duration-300 ease-in-out`}
              onClick={() => setTypeSelected(value.type)}
            >
              {value.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TypeSelector;
