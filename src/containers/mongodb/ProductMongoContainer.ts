import { Model } from "mongoose";

import { IProduct } from "../../interfaces";
import { generateID } from "../../utils/generateID";

class ProductMongoContainer {
  private collection: Model<IProduct>;
  // constructor(collection: string, schema: any) {
  //   this.collection = mongoose.model(collection, schema);
  // }
  constructor(model: Model<IProduct>) {
    this.collection = model;
  }

  //AddProduct
  addProduct = async (product: IProduct): Promise<number> => {
    const newProduct = new this.collection({
      ...product,
      id: generateID(),
      precio: Number(product.precio),
      timestamp: Date.now(),
    });
    const { id } = await newProduct.save();
    return id;
  };

  //GetItem
  getItem = async (id?: number): Promise<IProduct | null> => {
    return id
      ? ((await this.collection
          .findOne({ id })
          .select("-_id -__v")
          .lean()) as IProduct)
      : ((await this.collection
          .find()
          .select("-_id -__v")
          .lean()) as unknown as IProduct);
  };

  //deleteById
  deleteById = async (id: number): Promise<void> => {
    await this.collection.findOneAndDelete({ id });
  };

  //UpdateProduct
  updateProduct = async (id: string, product: IProduct): Promise<void> => {
    await this.collection.findOneAndUpdate({ id, product });
  };
}

export default ProductMongoContainer;
