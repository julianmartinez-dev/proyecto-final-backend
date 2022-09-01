import mongoose from "mongoose";

import ProductMongoContainer from "../../containers/mongodb/ProductMongoContainer";

const productSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true },
    nombre: { type: String, required: true, max: 100 },
    descripcion: { type: String, required: true, max: 400 },
    codigo: { type: String, required: true },
    foto: { type: String, required: true },
    precio: { type: Number, required: true },
    stock: { type: Number, required: true },
  },
  { timestamps: true }
);

class ProductsDaoMongo extends ProductMongoContainer {
  constructor() {
    super("products", productSchema);
  }
}

export default ProductsDaoMongo;
