import { useAppSelector } from "../../../app/hooks";
import { IBrand, IGetBrands } from "../../../domain/entities/Interface";
import Brands from "./Brands";

const GetBrands = ({ deleteProduct, setDeleteProduct }: IGetBrands) => {
  const brands = useAppSelector((state) => state.brands.brands);
  return (
    <div className="mt-6 w-11/12 mx-auto">
      <ul className="grid grid-cols-6 gap-4 text-center">
        {brands.map((brand: IBrand, index: number) => {
          return (
           <Brands key={index} brand={brand} deleteProduct={deleteProduct}/>
          );
        })}
      </ul>
    </div>
  );
};

export default GetBrands;
