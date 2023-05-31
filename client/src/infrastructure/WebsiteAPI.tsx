import { axiosPrivate } from "./api/axios";

interface IData {
  type: string;
  name: string | undefined;
  img: string;
}

const getWebsitesAPI = (type: string) => {
  return axiosPrivate.get(`api/website/get/${type}`);
};

const addWebsiteAPI = (data: IData) => {
  return axiosPrivate.post("api/website/add-website", data);
};

const deleteWebsiteAPI = (type: string, id: string) => {
  return axiosPrivate.delete(`api/website/delete-website/${type}/${id}`);
};

export { getWebsitesAPI, addWebsiteAPI, deleteWebsiteAPI };
