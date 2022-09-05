import fs from "fs";

import { IProduct } from "../../interfaces";

class ProductFileContainer {
  private fileName: string;
  constructor(fileName: string) {
    this.fileName = fileName;
    console.log("fileName", fileName);
  }

  addProduct = async (product: IProduct): Promise<number> => {
    try {
      const document = await fs.promises.readFile(this.fileName, "utf-8");
      const productList: IProduct[] = await JSON.parse(document);

      //If productList is empty, set id to 1, else set id to last id + 1
      productList.length
        ? (product.id = productList[productList.length - 1].id + 1)
        : (product.id = 1);

      //Set price to Number
      product.precio = Number(product.precio);
      product.timestamp = Date.now();
      productList.push(product);
      await fs.promises.writeFile(
        this.fileName,
        JSON.stringify(productList, null, 2)
      );
      return product.id;
    } catch (error) {
      throw new Error("Error saving file: " + error);
    }
  };

  getItem = async (id?: number): Promise<IProduct | IProduct[]> => {
    try {
      //Get products from file
      const data = await fs.promises.readFile(this.fileName, "utf-8");
      const products = await JSON.parse(data);

      //If id is not provided, return all products
      return id
        ? products.find((product: IProduct) => product.id === id) || null
        : products;
    } catch (error) {
      throw new Error(`Error reading file: ` + error);
    }
  };

  deleteById = async (id: number): Promise<void> => {
    try {
      const data = await fs.promises.readFile(this.fileName, "utf-8");
      const products = await JSON.parse(data);
      const productExist = products.some((p: IProduct) => p.id === id);

      if (!productExist) {
        throw new Error("Product doesnt exist");
      }

      const newProductList = products.filter(
        (product: IProduct) => product.id !== id
      );
      await fs.promises.writeFile(
        this.fileName,
        JSON.stringify(newProductList, null, 2)
      );
    } catch (error) {
      throw new Error("Error deleting product: " + error);
    }
  };

  deleteAll = async (): Promise<void> => {
    try {
      await fs.promises.writeFile(this.fileName, JSON.stringify([], null, 2));
    } catch (error) {
      throw new Error("Error deleting products: " + error);
    }
  };

  updateProduct = async (id: number, product: IProduct): Promise<void> => {
    try {
      const data = await fs.promises.readFile(this.fileName, "utf-8");
      const products = await JSON.parse(data);
      const productExist = products.some((p: IProduct) => p.id === id);

      if (!productExist) {
        throw new Error("Product doesnt exist");
      }
      const newProductList = products.filter(
        (product: IProduct) => product.id !== id
      );
      product.id = id;
      newProductList.push(product);

      await fs.promises.writeFile(
        this.fileName,
        JSON.stringify(newProductList, null, 2)
      );
    } catch (error) {
      throw new Error(error as string);
    }
  };
}

export default ProductFileContainer;
