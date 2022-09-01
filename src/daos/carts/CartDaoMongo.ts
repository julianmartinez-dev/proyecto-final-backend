import { Schema } from "mongoose";

import CartMongoContainer from "../../containers/mongodb/CartMongoContainer";

const cartSchema = new Schema(
  {
    id: { type: Number, required: true },
    productos: { type: Array, required: true },
  },
  {
    timestamps: true,
  }
);

class CartDaoMongo extends CartMongoContainer {
  constructor() {
    super("carts", cartSchema);
  }
}

export default CartDaoMongo;
