import { axiosPrivate } from "./api/axios";
import { ISneaker } from "../domain/entities/Interface";

interface IGetSneakerByMonth {
  typeSelected: string;
  month: string;
  year: string;
}

const getSneakersAPI = () => {
  return axiosPrivate.get("api/sneaker/get");
};

const getSneakersByMonthAPI = (input: IGetSneakerByMonth) => {
  return axiosPrivate.get(
    `api/sneaker/get-by-month/${input.typeSelected}/${input.month}/${input.year}`
  );
};

const addSneakerAPI = (data: ISneaker) => {
  return axiosPrivate.post("api/sneaker/add", data);
};

const updateSneakerAPI = (data: ISneaker, id: string) => {
  return axiosPrivate.patch(`api/sneaker/update/${id}`, data);
};

const deleteSneakerAPI = (id: string) => {
  return axiosPrivate.delete(`api/sneaker/delete/${id}`);
};

export {
  getSneakersAPI,
  getSneakersByMonthAPI,
  deleteSneakerAPI,
  addSneakerAPI,
  updateSneakerAPI,
};
