import { IProduct } from "./";

export interface ICart {
  id: number;
  timestamp: number;
  productos: IProduct[];
}
