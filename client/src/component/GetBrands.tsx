
import { useAppSelector } from "../app/hooks";
import { IBrand } from "../interface/Interface";

const GetBrands = () => {
  const brands = useAppSelector((state) => state.brands.brands);
  return (
    <div className="mt-6 w-11/12 mx-auto">
      <ul className="grid grid-cols-6 gap-4 text-center">
        {brands.map(
          (brand: IBrand, index: number) => {
            return (
              <li
                key={index}
                className="p-3 bg-gradient-to-r from-indigo-500 to-indigo-400 font-bold text-slate-50 rounded-br-lg rounded-tl-lg transition ease-in-out hover:scale-110 duration-300"
              >
                {brand.name}
              </li>
            );
          }
        )}
      </ul>
    </div>
  );
};

export default GetBrands;
