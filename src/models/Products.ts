import mongoose, { Model, model, Schema } from "mongoose";

import { IProduct } from "../interfaces";

const productSchema = new Schema({
  id: { type: Number, required: true },
  nombre: { type: String, required: true, max: 100 },
  descripcion: { type: String, required: true, max: 400 },
  codigo: { type: String, required: true },
  foto: { type: String, required: true },
  precio: { type: Number, required: true },
  stock: { type: Number, required: true },
  timestamp: { type: Number, required: true },
});

export const Product: Model<IProduct> =
  mongoose.models.Product || model("products", productSchema);
