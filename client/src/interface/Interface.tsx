export interface ISite {
  _id: string;
  name: string;
}

export interface IGetSites {
  type: string;
}

export interface ISneaker {
  _id: string;
  name: string;
  size: string;
  buyingPrice: string;
  buyingDate: string;
  websiteId: string;
  sold: boolean;
  sellingDate: string;
  resellPrice: string;
  resellWebsiteId: string;
}

export interface IModal {
  setOpenModal: (value: boolean) => void;
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

export interface IExpensive {
  _id: string;
  name: string;
  type: string;
  price: number;
}

export interface IExpensiveState {
  expensives: Array<IExpensive>;
}
