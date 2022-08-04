import { Request, Response } from "express";

import { ICartController } from "../interfaces";
import CartContainer from "../models/cart";

class CartController implements ICartController {
  container: CartContainer;
  constructor() {
    this.addProduct = this.addProduct;
    this.deleteProduct = this.deleteProduct;
    this.createCart = this.createCart;
    this.getProducts = this.getProducts;
    this.deleteCart = this.deleteCart;
    this.container = new CartContainer("carts", ".json");
  }
  createCart = async (req: Request, res: Response): Promise<void> => {
    const cart = req.body;
    const newCart = {
      ...cart,
      timestamp: Date.now(),
    };
    const id = await this.container.createCart(newCart);
    res.status(201).json({
      message: "Cart created",
      id,
    });
  };
  addProduct = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    if (!id || isNaN(Number(id))) {
      res.status(400).json({
        message: "Invalid id",
      });
      return;
    }
    const cart = await this.container.getCart(Number(id));
    if (!cart) {
      res.status(404).json({
        message: "Cart not found",
      });
      return;
    }
    try {
      await this.container.addProductToCart(cart, req.body);
      res.status(200).json({
        message: "Product added to cart",
      });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({
          message: error.message,
        });
      }
    }
  };

  deleteProduct = async (req: Request, res: Response): Promise<void> => {
    const { id, id_prod } = req.params;
    if (!id || isNaN(Number(id)) || !id_prod || isNaN(Number(id_prod))) {
      res.status(400).json({
        message: "Invalid id, check your params",
      });
      return;
    }

    const cart = await this.container.getCart(Number(id));
    if (!cart) {
      res.status(404).json({
        message: "Cart not found",
      });
      return;
    }

    try {
      await this.container.deleteProductFromCart(cart, Number(id_prod));
      res.status(200).json({
        message: "Product deleted from cart",
      });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({
          message: error.message,
        });
      }
    }
  };
  getProducts = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const data = await this.container.getCart(Number(id));
    if (!data) {
      res.status(404).json({
        message: "Cart not found",
      });
    } else {
      res.json(data.productos);
    }
  };

  deleteCart = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
      await this.container.deleteById(Number(id));
      res.json({
        message: "Cart deleted",
      });
    } catch (error) {
      if (error instanceof Error) {
        res.status(404).json({
          message: error.message,
        });
      }
    }
  };
}

export default CartController;
