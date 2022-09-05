import { ICart, IProduct } from "../../interfaces";

class CartMemoryContainer {
  private cartList: ICart[];
  constructor() {
    this.cartList = [];
  }
  createCart = (cart: ICart): number => {
    this.cartList.length
      ? (cart.id = this.cartList[this.cartList.length - 1].id + 1)
      : (cart.id = 1);
    this.cartList.push(cart);
    return cart.id;
  };

  getCart = (id: number): ICart | null => {
    return this.cartList.find((c) => c.id === Number(id)) || null;
  };

  deleteById = (id: number): void => {
    const cartExist = this.cartList.some((c) => c.id === Number(id));
    if (!cartExist) {
      throw new Error("Cart doesnt exist");
    }
    this.cartList = this.cartList.filter((cart) => cart.id !== id);
  };

  deleteProduct = (cart: ICart, productID: number): void => {
    const newCart = cart.productos.filter((p) => p.id !== productID);

    //Update cart list
    const newCartList: ICart[] = this.cartList.map((c: ICart) => {
      if (c.id === cart.id) {
        c.productos = newCart;
      }
      return c;
    });

    this.cartList = newCartList;
  };

  addProduct = (cart: ICart, product: IProduct): void => {
    const newCart = [...cart.productos, product];
    const newCartList: ICart[] = this.cartList.map((c: ICart) => {
      if (c.id === cart.id) {
        c.productos = newCart;
      }
      return c;
    });

    this.cartList = newCartList;
  };
}
export default CartMemoryContainer;
