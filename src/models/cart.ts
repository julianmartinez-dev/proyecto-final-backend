import fs from "fs";

import { ICart } from "../interfaces";
import { IProduct } from "../interfaces/product";
import Container, { IFileExtension } from "./container";

class CartContainer extends Container {
  constructor(fileName: string, fileExtension: IFileExtension) {
    super(fileName, fileExtension);
  }
  async createCart(cart: ICart): Promise<number> {
    try {
      const document = await fs.promises.readFile(this.file, "utf-8");
      const cartList: ICart[] = await JSON.parse(document);

      cartList.length
        ? (cart.id = cartList[cartList.length - 1].id + 1)
        : (cart.id = 1);
      cartList.push(cart);
      await fs.promises.writeFile(this.file, JSON.stringify(cartList, null, 2));
      return cart.id;
    } catch (error) {
      throw new Error("Error saving file: " + error);
    }
  }
  async getCart(id: number): Promise<ICart> {
    try {
      const data = await fs.promises.readFile(this.file, "utf-8");
      const carts = await JSON.parse(data);
      return carts.find((cart: ICart) => cart.id === id) || null;
    } catch (error) {
      throw new Error(`Error reading file: ` + error);
    }
  }
  async deleteById(id: number): Promise<void> {
    try {
      const data = await fs.promises.readFile(this.file, "utf-8");
      const carts = await JSON.parse(data);
      const cartExist = carts.some((c: ICart) => c.id === id);

      if (!cartExist) {
        throw new Error("Cart doesnt exist");
      }

      const newCartList = carts.filter((cart: ICart) => cart.id !== id);
      await fs.promises.writeFile(
        this.file,
        JSON.stringify(newCartList, null, 2)
      );
    } catch (error) {
      throw new Error(error as string);
    }
  }

  async deleteProductFromCart(cart: ICart, productID: number): Promise<void> {
    try {
      const data = await fs.promises.readFile(this.file, "utf-8");
      const carts = await JSON.parse(data);

      const newCart = cart.productos.filter(
        (p: IProduct) => p.id !== productID
      );
      const newCartList: ICart[] = carts.map((c: ICart) => {
        if (c.id === cart.id) {
          c.productos = newCart;
        }
        return c;
      });
      await fs.promises.writeFile(
        this.file,
        JSON.stringify(newCartList, null, 2)
      );
    } catch (error) {
      throw new Error(error as string);
    }
  }

  async addProductToCart(cart: ICart, product: IProduct) {
    try {
      const data = await fs.promises.readFile(this.file, "utf-8");
      const carts = await JSON.parse(data);

      cart.productos.push(product);
      const newCartList: ICart[] = carts.map((c: ICart) => {
        if (c.id === cart.id) {
          c.productos = cart.productos;
        }
        return c;
      });
      await fs.promises.writeFile(
        this.file,
        JSON.stringify(newCartList, null, 2)
      );
    } catch (error) {}
  }
}

export default CartContainer;
