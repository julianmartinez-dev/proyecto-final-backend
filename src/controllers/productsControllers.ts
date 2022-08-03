import { Request, Response } from "express";

import { IProductsController } from "../interfaces";
import { IProduct } from "../interfaces/product";
import ProductContainer from "../models/product";

class ProductsController implements IProductsController {
  container: ProductContainer;
  constructor() {
    this.getProducts = this.getProducts;
    this.addProduct = this.addProduct;
    this.getProductById = this.getProductById;
    this.deleteProduct = this.deleteProduct;
    this.container = new ProductContainer("products", ".json");
  }

  getProducts = async (_req: Request, res: Response): Promise<void> => {
    const data = await this.container.getItem();
    if (!data) {
      res.status(404).json({
        message: "Product not found",
      });
    } else {
      res.json(data);
    }
  };

  addProduct = async (req: Request, res: Response): Promise<void> => {
    const newProduct = {
      ...req.body,
      timestamp: Date.now(),
      precio: Number(req.body.precio),
    };
    const id = await this.container.addProduct(newProduct);
    if (!id) {
      res.status(500).json({
        message: "Error saving product",
      });
    }
    res.status(201).json({
      message: "Product added",
      id,
    });
  };
  getProductById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    if (!id || isNaN(Number(id))) {
      res.status(400).json({ message: "Bad Request: Check yours params" });
      return;
    }
    const data = await this.container.getItem(Number(id));
    if (!data) {
      res.status(404).json({
        message: "Product not found",
      });
    } else {
      res.json(data);
    }
  };

  deleteProduct = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      await this.container.deleteById(Number(id));
      res.json({
        message: "Product deleted",
      });
    } catch (error) {
      res.status(400).json({
        message: "Error deleting product",
      });
    }
  };
}
export default ProductsController;
