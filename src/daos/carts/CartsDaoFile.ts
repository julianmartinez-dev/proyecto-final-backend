import { ICart } from "../../../src/interfaces/cart";
import { IProduct } from "../../../src/interfaces/product";
import ContainerFile from "../../containers/ContainerFiles";

class CartsDaoFile extends ContainerFile {
  constructor(filePath: string) {
    super(filePath);
  }

  addProduct = async (cart: ICart, product: IProduct): Promise<void> => {
    try {
      const data = await this.read();
      const carts = await JSON.parse(data);
      cart.productos.push(product);

      const newCartList: ICart[] = carts.map((c: ICart) => {
        if (c.id === cart.id) {
          c.productos = cart.productos;
        }
        return c;
      });
      await this.write(JSON.stringify(newCartList, null, 2));
    } catch (error) {
      console.log(error);
    }
  };

  deleteProduct = async (cart: ICart, productID: number): Promise<void> => {
    try {
      //Read data from file and get list of carts
      const data = await this.read();
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
      await this.write(JSON.stringify(newCartList, null, 2));
    } catch (error) {
      throw new Error(error as string);
    }
  };

  deleteById = async (id: number): Promise<void> => {
    try {
      const data = await this.read();
      const carts = await JSON.parse(data);
      const cartExist = carts.some((c: ICart) => c.id === id);

      if (!cartExist) {
        throw new Error("Cart doesnt exist");
      }

      const newCartList = carts.filter((cart: ICart) => cart.id !== id);
      await this.write(JSON.stringify(newCartList, null, 2));
    } catch (error) {
      throw new Error(error as string);
    }
  };

  getCart = async (id: number): Promise<ICart> => {
    try {
      const data = await this.read();
      const carts = await JSON.parse(data);
      const cart = carts.find((c: ICart) => c.id === id) || null;
      return cart;
    } catch (error) {
      throw new Error(error as string);
    }
  };

  createCart = async (cart: ICart): Promise<number> => {
    try {
      const document = await this.read();
      const cartList: ICart[] = await JSON.parse(document);
      cartList.length
        ? (cart.id = cartList[cartList.length - 1].id + 1)
        : (cart.id = 1);
      cartList.push(cart);
      await this.write(JSON.stringify(cartList, null, 2));
      return cart.id;
    } catch (error) {
      throw new Error("Error saving file: " + error);
    }
  };
}

export default CartsDaoFile;
