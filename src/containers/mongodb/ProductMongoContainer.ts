import { Model } from "mongoose";

import { mongoConnect, mongoDisconnect } from "../../config/connections";
import { IProduct } from "../../interfaces";
import { generateID } from "../../utils/generateID";

class ProductMongoContainer {
  private collection: Model<IProduct>;
  constructor(model: Model<IProduct>) {
    this.collection = model;
  }

  //AddProduct
  addProduct = async (product: IProduct): Promise<number> => {
    try {
      await mongoConnect();
      const newProduct = new this.collection({
        ...product,
        id: generateID(),
        precio: Number(product.precio),
        timestamp: Date.now(),
      });
      const { id } = await newProduct.save();
      return id;
    } catch (error) {
      throw new Error("error adding product");
    } finally {
      await mongoDisconnect();
    }
  };

  //GetItem
  getItem = async (id?: number): Promise<IProduct | null> => {
    try {
      await mongoConnect();
      return id
        ? ((await this.collection
            .findOne({ id })
            .select("-_id -__v")
            .lean()) as IProduct)
        : ((await this.collection
            .find()
            .select("-_id -__v")
            .lean()) as unknown as IProduct);
    } catch (error) {
      throw new Error("error getting product");
    } finally {
      await mongoDisconnect();
    }
  };

  //deleteById
  deleteById = async (id: number): Promise<void> => {
    try {
      await mongoConnect();
      await this.collection.findOneAndDelete({ id });
    } catch (error) {
      throw new Error("error deleting product");
    } finally {
      await mongoDisconnect();
    }
  };

  //UpdateProduct
  updateProduct = async (id: string, product: IProduct): Promise<void> => {
    try {
      await mongoConnect();
      await this.collection.findOneAndUpdate({ id }, { $set: product });
    } catch (error) {
      throw new Error("error updating product");
    } finally {
      await mongoDisconnect();
    }
    // await this.collection.findOneAndUpdate({ id, product });
  };
}

export default ProductMongoContainer;
