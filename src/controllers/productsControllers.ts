import { Request, Response } from "express";

import { IProductsController } from "../interfaces";
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
    const data = await this.container.getProduct();
    if (!data) {
      res.status(404).json({
        message: "Product not found",
      });
    } else {
      res.json(data);
    }
  };

  addProduct = async (req: Request, res: Response): Promise<void> => {
    const { product } = req.body;
    await this.container.addProduct(product);
    res.status(201).json({
      message: "Product added",
    });
  };

  getProductById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const data = await this.container.getProduct(Number(id));
    if (!data) {
      res.status(404).json({
        message: "Product not found",
      });
    } else {
      res.json(data);
    }
  };

  deleteProduct = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    await this.container.deleteById(Number(id));
    res.json({
      message: "Product deleted",
    });
  };
}

export default ProductsController;
