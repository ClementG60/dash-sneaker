import moment from "moment";

export interface ISite {
  _id: string;
  name: string;
}

export interface IBrand {
  _id: string;
  name: string;
}

export interface IGetSites {
  type: string;
}

export interface IForm {
  id: string;
  setOpenModal: (value: boolean) => void;
  typeSelected?: string;
}

export interface ISneaker {
  _id?: string;
  brandId: string;
  model: string;
  colorway: string;
  size: string;
  buyingPrice: number;
  buyingDate: string;
  websiteId: string;
  sold: boolean;
  sellingDate: string;
  resellPrice: number;
  resellWebsiteId: string;
}

export interface IModal {
  setOpenModal: (value: boolean) => void;
  model: string;
  id: string;
  typeSelected?: string;
}
export interface INavigation {
  setIsOpen: (value: boolean) => void;
  isOpen: boolean;
}

export interface IHome {
  isOpen: boolean;
}

export interface ICardStatistics {
  title: string;
  sum: number;
  lastSumMonth: number;
  isOpen: boolean;
}

export interface ICardChart {
  data: Array<IChartData>;
  isOpen: boolean;
  type: string;
  labelTitle: string;
  title: string;
}

export interface IFormSneaker {
  update: boolean;
}

export interface ISneakerState {
  sneakers: Array<ISneaker>;
}

export interface IWebsiteState {
  websites: Array<ISite>;
}

export interface IBrandState {
  brands: Array<IBrand>;
}

export interface IExpensive {
  _id: string;
  name: string;
  type: string;
  price: number;
  date: string;
}

export interface IExpensiveState {
  expensives: Array<IExpensive>;
}

export interface InputGroupProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (value: string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  error?: boolean;
  errorDetails?: string;
}

export interface IDateSelector {
  date: moment.Moment;
  setDate: React.Dispatch<React.SetStateAction<moment.Moment>>;
}

export interface IChartData {
  _id: string;
  count: number;
}

