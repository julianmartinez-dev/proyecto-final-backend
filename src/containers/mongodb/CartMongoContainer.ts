import mongoose, { Model } from "mongoose";

import { config } from "../../config";
import { ICart, IProduct } from "../../interfaces";

try {
  mongoose.connect(config.mongoDB.url);
  console.log("Connected to MongoDB Cart");
} catch (error) {
  console.log(error);
}

class CartMongoContainer {
  private collection: Model<ICart>;
  constructor(model: Model<ICart>) {
    this.collection = model;
  }

  //CreateCart
  createCart = async (cart: ICart): Promise<number> => {
    const newCart = new this.collection({
      ...cart,
      id: 1233,
      timestamp: Date.now(),
    });
    const { id } = await newCart.save();
    return id;
  };

  //GetCart

  getCart = async (id?: number): Promise<ICart | null> => {
    //If the id is not passed, it will return all the carts
    return id
      ? ((await this.collection.findOne({ id })) as ICart)
      : ((await this.collection.find()) as unknown as ICart);
  };

  //DeleteById
  deleteById = async (id: string): Promise<void> => {
    await this.collection.findOneAndDelete({ id });
  };

  //DeleteProduct
  deleteProduct = async (cart: ICart, productID: number): Promise<void> => {
    //Check if the product exists in the cart
    const cartDB = await this.collection.findOne({ id: cart.id });
    if (!cartDB) {
      throw new Error("Cart not found");
    }
    const product = cartDB.productos.find((prod) => prod.id === productID);

    if (!product) {
      throw new Error("Product not found");
    }

    //Delete the product
    const newCart = cartDB.productos.filter(
      (product) => product.id !== productID
    );
    cartDB.productos = newCart;

    //Save the new cart
    await cartDB.save();
  };

  //AddProduct
  addProduct = async (cart: ICart, product: IProduct): Promise<void> => {
    const cartDB = await this.collection.findOne({ id: cart.id });
    if (!cartDB) {
      throw new Error("Cart not found");
    }
    cartDB.productos.push(product);
    await cartDB.save();
  };
}

export default CartMongoContainer;
