import mongoose from "mongoose";

import { IProduct } from "../../interfaces";

class ProductMongoContainer {
  private collection;
  constructor(collection: string, schema: mongoose.Schema) {
    this.collection = mongoose.model(collection, schema);
  }

  //AddProduct
  addProduct = async (product: IProduct): Promise<number> => {
    const newProduct = new this.collection(product);
    const { _id } = await newProduct.save();
    return _id;
  };

  //GetItem
  getItem = async (id?: string): Promise<IProduct | null> => {
    return id
      ? await this.collection.findById(id)
      : await this.collection.find();
  };

  //deleteById
  deleteById = async (id: string): Promise<void> => {
    await this.collection.findByIdAndDelete(id);
  };

  //DeleteAll
  deleteAll = async (): Promise<void> => {
    await this.collection.deleteMany({});
  };

  //UpdateProduct
  updateProduct = async (id: string, product: IProduct): Promise<void> => {
    await this.collection.findByIdAndUpdate(id, product);
  };
}

export default ProductMongoContainer;
