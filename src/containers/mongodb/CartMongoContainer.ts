import { Model } from "mongoose";

import { mongoConnect, mongoDisconnect } from "../../config/connections";
import { ICart, IProduct } from "../../interfaces";
import { generateID } from "../../utils/generateID";

class CartMongoContainer {
  private collection: Model<ICart>;
  constructor(model: Model<ICart>) {
    this.collection = model;
  }

  //CreateCart
  createCart = async (cart: ICart): Promise<number> => {
    try {
      await mongoConnect();
      const newCart = new this.collection({
        ...cart,
        id: generateID(),
        timestamp: Date.now(),
      });
      const { id } = await newCart.save();
      return id;
    } catch (error) {
      throw new Error("error adding cart");
    } finally {
      mongoDisconnect();
    }
  };

  //GetCart

  getCart = async (id?: number): Promise<ICart | null> => {
    try {
      await mongoConnect();
      //If the id is not passed, it will return all the carts
      return id
        ? ((await this.collection.findOne({ id })) as ICart)
        : ((await this.collection.find()) as unknown as ICart);
    } catch (error) {
      throw new Error("error getting cart");
    } finally {
      await mongoDisconnect();
    }
  };

  //DeleteById
  deleteById = async (id: string): Promise<void> => {
    try {
      await mongoConnect();
      await this.collection.findOneAndDelete({ id });
    } catch (error) {
      throw new Error("error deleting cart");
    } finally {
      await mongoDisconnect();
    }
  };

  //DeleteProduct
  deleteProduct = async (cart: ICart, productID: number): Promise<void> => {
    //Check if the product exists in the cart
    try {
      await mongoConnect();
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
    } catch (error) {
      throw new Error("error deleting product");
    } finally {
      await mongoDisconnect();
    }
  };

  //AddProduct
  addProduct = async (cart: ICart, product: IProduct): Promise<void> => {
    try {
      await mongoConnect();
      const cartDB = await this.collection.findOne({ id: cart.id });
      if (!cartDB) {
        throw new Error("Cart not found");
      }
      cartDB.productos.push(product);
      await cartDB.save();
    } catch (error) {
      throw new Error("error adding product");
    } finally {
      await mongoDisconnect();
    }
  };
}

export default CartMongoContainer;
