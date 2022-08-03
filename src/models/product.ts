import fs from "fs";

import { IProduct } from "../interfaces/product";
import Container, { IFileExtension } from "./container";

class ProductContainer extends Container {
  constructor(fileName: string, fileExtension: IFileExtension) {
    super(fileName, fileExtension);
  }

  async addProduct(product: IProduct): Promise<number> {
    try {
      const document = await fs.promises.readFile(this.file, "utf-8");
      const productList: IProduct[] = await JSON.parse(document);

      productList.length
        ? (product.id = productList[productList.length - 1].id + 1)
        : (product.id = 1);

      productList.push(product);
      await fs.promises.writeFile(
        this.file,
        JSON.stringify(productList, null, 2)
      );
      return product.id;
    } catch (error) {
      throw new Error("Error saving file: " + error);
    }
  }

  async getProduct(id?: number): Promise<IProduct> {
    try {
      const data = await fs.promises.readFile(this.file, "utf-8");
      const products = await JSON.parse(data);
      return id
        ? products.find((product: IProduct) => product.id === id) || null
        : products;
    } catch (error) {
      throw new Error(`Error reading file: ` + error);
    }
  }

  async deleteById(id: number): Promise<void> {
    try {
      const data = await fs.promises.readFile(this.file, "utf-8");
      const products = await JSON.parse(data);
      const productExist = products.some((p: IProduct) => p.id === id);

      if (!productExist) {
        throw new Error("Product doesnt exist");
      }

      const newProductList = products.filter(
        (product: IProduct) => product.id !== id
      );
      await fs.promises.writeFile(
        this.file,
        JSON.stringify(newProductList, null, 2)
      );
    } catch (error) {}
  }

  async deleteAll(): Promise<void> {
    try {
      await fs.promises.writeFile(this.file, JSON.stringify([], null, 2));
    } catch (error) {
      throw new Error("Error deleting products: " + error);
    }
  }

  async updateProduct(id: number, product: IProduct): Promise<void> {
    try {
      const data = await fs.promises.readFile(this.file, "utf-8");
      const products = await JSON.parse(data);
      const productExist = products.some((p: IProduct) => p.id === id);
      if (!productExist) throw new Error("Product doesnt exists");

      const newProductList = products.filter(
        (product: IProduct) => product.id === id
      );
      product.id = id;
      newProductList.push(product);

      await fs.promises.writeFile(
        this.file,
        JSON.stringify(newProductList, null, 2)
      );
    } catch (error) {
      throw new Error("Error updating product, " + error);
    }
  }
}

export default ProductContainer;
