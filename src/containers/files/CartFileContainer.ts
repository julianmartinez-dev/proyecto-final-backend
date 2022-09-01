import fs from "fs";

import { ICart, IProduct } from "../../interfaces";

class CartFileContainer {
  private fileName: string;
  constructor(fileName: string) {
    this.fileName = fileName;
  }
  createCart = async (cart: ICart): Promise<number> => {
    try {
      const document = await fs.promises.readFile(this.fileName, "utf-8");
      const cartList: ICart[] = await JSON.parse(document);
      cartList.length
        ? (cart.id = cartList[cartList.length - 1].id + 1)
        : (cart.id = 1);
      cartList.push(cart);
      await fs.promises.writeFile(
        this.fileName,
        JSON.stringify(cartList, null, 2)
      );
      console.log("Desde createCart");
      return cart.id;
    } catch (error) {
      throw new Error("Error saving file: " + error);
    }
  };
  getCart = async (id: number): Promise<ICart> => {
    try {
      const data = await fs.promises.readFile(this.fileName, "utf-8");
      const carts = await JSON.parse(data);
      const cart = carts.find((c: ICart) => c.id === id) || null;
      return cart;
    } catch (error) {
      throw new Error(error as string);
    }
  };

  deleteById = async (id: number): Promise<void> => {
    try {
      const data = await fs.promises.readFile(this.fileName, "utf-8");
      const carts = await JSON.parse(data);
      const cartExist = carts.some((c: ICart) => c.id === id);

      if (!cartExist) {
        throw new Error("Cart doesnt exist");
      }

      const newCartList = carts.filter((cart: ICart) => cart.id !== id);
      await fs.promises.writeFile(
        this.fileName,
        JSON.stringify(newCartList, null, 2)
      );
    } catch (error) {
      throw new Error(error as string);
    }
  };

  deleteProduct = async (cart: ICart, productID: number): Promise<void> => {
    try {
      //Read data from file and get list of carts
      const data = await fs.promises.readFile(this.fileName, "utf-8");
      const carts = await JSON.parse(data);

      //Delete product from cart
      const newCart = cart.productos.filter(
        (p: IProduct) => p.id !== productID
      );

      //Update cart list
      const newCartList: ICart[] = carts.map((c: ICart) => {
        if (c.id === cart.id) {
          c.productos = newCart;
        }
        return c;
      });
      //Write new cart list to file
      await fs.promises.writeFile(
        this.fileName,
        JSON.stringify(newCartList, null, 2)
      );
    } catch (error) {
      throw new Error(error as string);
    }
  };

  addProduct = async (cart: ICart, product: IProduct): Promise<void> => {
    try {
      const data = await fs.promises.readFile(this.fileName, "utf-8");
      const carts = await JSON.parse(data);
      cart.productos.push(product);

      const newCartList: ICart[] = carts.map((c: ICart) => {
        if (c.id === cart.id) {
          c.productos = cart.productos;
        }
        return c;
      });
      await fs.promises.writeFile(
        this.fileName,
        JSON.stringify(newCartList, null, 2)
      );
    } catch (error) {
      console.log(error);
    }
  };
}

export default CartFileContainer;
