import { axiosPrivate } from "./api/axios";

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

const deleteSneakerAPI = (id: string) => {
  return axiosPrivate.delete(`api/sneaker/delete/${id}`);
};

export { getSneakersAPI, getSneakersByMonthAPI, deleteSneakerAPI };
