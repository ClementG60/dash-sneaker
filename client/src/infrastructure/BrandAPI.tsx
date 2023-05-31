import { axiosPrivate } from "./api/axios";

interface IDataBrand {
  name: string | undefined;
}

const getBrandsAPI = () => {
  return axiosPrivate.get("api/brand/get");
};

const addBrandAPI = (data: IDataBrand) => {
  return axiosPrivate.post("api/brand/add", data);
};

const deleteBrandAPI = (id: string) => {
  return axiosPrivate.delete(`api/brand/delete/${id}`);
};

export { getBrandsAPI, addBrandAPI, deleteBrandAPI };
