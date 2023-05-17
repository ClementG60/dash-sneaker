import { axiosPrivate } from "./api/axios";

export const getSneakers = () => {
    return axiosPrivate.get('api/sneaker/get')
}
