import { axiosPrivate } from "./api/axios";
import { ITracking } from "../domain/entities/Interface";

const getTrackingsAPI = () => {
  return axiosPrivate.get("api/tracking/get");
};

const addTrackingAPI = (data: ITracking) => {
  return axiosPrivate.post("api/tracking/add", data);
};

const deleteTrackingAPI = (id: string) => {
  return axiosPrivate.delete(`api/tracking/delete/${id}`);
};

export { getTrackingsAPI, addTrackingAPI, deleteTrackingAPI };
