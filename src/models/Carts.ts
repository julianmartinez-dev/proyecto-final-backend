import mongoose, { Model, model, Schema } from "mongoose";

import { ICart } from "../interfaces";

const cartSchema = new Schema(
  {
    id: { type: Number, required: true },
    productos: { type: Array, required: true },
  },
  {
    timestamps: true,
  }
);

const Cart: Model<ICart> = mongoose.models.Cart || model("cart", cartSchema);

export default Cart;
