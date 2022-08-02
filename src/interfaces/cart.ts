import { IProduct } from "./";

export interface ICart {
  id: number;
  timestamp: string;
  products: IProduct[];
}
