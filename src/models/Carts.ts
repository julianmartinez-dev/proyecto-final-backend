import { Model, model, models, Schema } from "mongoose";

import { ICart } from "../interfaces";

const cartSchema = new Schema({
  id: { type: Number, required: true },
  productos: { type: Array, required: true },
  timestamp: { type: Number, required: true },
});

export const Cart: Model<ICart> = models.Cart || model("carts", cartSchema);
