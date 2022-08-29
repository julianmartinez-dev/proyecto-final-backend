import { Request, Response } from "express";

export interface IProductsController {
  getProducts(req: Request, resp: Response): Promise<void>;
  addProduct(req: Request, resp: Response): Promise<void>;
  getProductById(req: Request, resp: Response): Promise<void>;
  deleteProduct(req: Request, resp: Response): Promise<void>;
}

export interface ICartController {
  addProduct(req: Request, res: Response): Promise<void>;
  deleteProduct(req: Request, res: Response): Promise<void>;
  createCart(req: Request, res: Response): Promise<void>;
  getProducts(req: Request, res: Response): Promise<void>;
  deleteCart(req: Request, res: Response): Promise<void>;
}
