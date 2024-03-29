export interface IOpen {
  isOpen: boolean;
}

export interface ISite {
  _id: string;
  name: string;
}

export interface IStat {
  name: string;
  number: number;
}

export interface ISiteMap {
  deleteProduct: boolean;
  site: ISite;
  type: string;
}

export interface IBrand {
  _id: string;
  name: string;
}

export interface IBrandMap {
  deleteProduct: boolean;
  brand: IBrand;
}

export interface IGetSites {
  type: string;
  deleteProduct: boolean;
  setDeleteProduct: (value: boolean) => void;
}

export interface IGetBrands {
  deleteProduct: boolean;
  setDeleteProduct: (value: boolean) => void;
}

export interface IHandleWebsite {
  type: string;
  name: string;
  img: string;
}

export interface IAddSite {
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

export interface IStuff {
  _id?: string;
  type: string;
  description: string;
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

export interface ITracking {
  _id: string;
  transporter: string;
  trackingNumber: string;
}

export interface ITrackingArrayLine {
  setRefresh: (value: boolean) => void;
  setIsLoading: (value: boolean) => void;
  refresh: boolean;
  tracking: {
    _id: string;
    transporter: string;
    trackingNumber: string;
  };
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

export interface ICardSum {
  title: string;
  sum: number;
  lastSumMonth: number;
  isOpen: boolean;
}

export interface ICardSingleStat {
  title: string;
  data: number;
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

export interface IStuffState {
  stuffs: Array<IStuff>;
}

export interface IWebsiteState {
  websites: Array<ISite>;
}

export interface IBrandState {
  brands: Array<IBrand>;
}

export interface ITrackingState {
  trackings: Array<ITracking>;
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

export interface IChartData {
  _id: string;
  count: number;
}
