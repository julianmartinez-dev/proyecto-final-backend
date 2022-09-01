import mongoose, { Model, model, Schema } from "mongoose";

import { IProduct } from "../interfaces";

const productSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
      default: "",
    },
    precio: {
      type: Number,
      required: true,
      default: 0,
    },
    descripcion: {
      type: String,
      required: true,
      trim: true,
      default: "",
    },
    codigo: {
      type: String,
      required: true,
      trim: true,
      default: "",
    },
    foto: {
      type: String,
      required: true,
      trim: true,
      default: "",
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Product: Model<IProduct> =
  mongoose.models.Product || model("Product", productSchema);

export default Product;
