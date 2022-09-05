import { Request, Response } from "express";

import { IProductsController } from "../interfaces";

class ProductsController implements IProductsController {
  private container;
  constructor(container) {
    this.container = container;
  }

  getProducts = async (_req: Request, res: Response): Promise<void> => {
    // const data = await this.container.getItem();
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
      //TODO: quitar esto
      //!Aplicado en mongodb
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

  updateProduct = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    if (!id || isNaN(Number(id))) {
      res.status(400).json({ message: "Bad Request: Check yours params" });
      return;
    }
    const newProduct = {
      ...req.body,
      precio: Number(req.body.precio),
    };

    try {
      await this.container.updateProduct(Number(id), newProduct);
      res.json({
        message: "Product updated",
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
export default ProductsController;
