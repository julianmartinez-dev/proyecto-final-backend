import mongoose from "mongoose";

import { ICart, IProduct } from "../../interfaces";

class CartMongoContainer {
  private collection;
  constructor(collection: string, schema: mongoose.Schema) {
    this.collection = mongoose.model(collection, schema);
  }

  //CreateCart
  createCart = async (cart: ICart): Promise<number> => {
    const newCart = new this.collection(cart);
    const { _id } = await newCart.save();
    return _id;
  };

  //GetCart

  getCart = async (id?: string): Promise<ICart | null> => {
    return id
      ? await this.collection.findById(id)
      : await this.collection.find();
  };

  //DeleteById
  deleteById = async (id: string): Promise<void> => {
    await this.collection.findByIdAndDelete(id);
  };

  //DeleteProduct
  deleteProduct = async (cart: ICart, productID: number): Promise<string> => {
    return "Falta implementar";
  };

  //AddProduct
  addProduct = async (cart: ICart, product: IProduct): Promise<string> => {
    return "Falta implementar";
  };
}

export default CartMongoContainer;
