import { Request, Response } from "express";

import { ICartController } from "../interfaces";

class CartController implements ICartController {
  constructor() {
    this.addProduct = this.addProduct;
    this.deleteProduct = this.deleteProduct;
    this.createCart = this.createCart;
    this.getProducts = this.getProducts;
    this.deleteCart = this.deleteCart;
  }
  addProduct = async (req: Request, res: Response): Promise<void> => {
    res.json({ message: "Desde addProduct" });
  };

  deleteProduct = async (req: Request, res: Response): Promise<void> => {
    res.json({ message: "Desde deleteProduct" });
  };

  createCart = async (req: Request, res: Response): Promise<void> => {
    res.json({ message: "Desde createCart" });
  };

  getProducts = async (req: Request, res: Response): Promise<void> => {
    res.json({ message: "Desde getProducts" });
  };

  deleteCart = async (req: Request, res: Response): Promise<void> => {
    res.json({ message: "Desde deleteCart" });
  };
}

export default CartController;
