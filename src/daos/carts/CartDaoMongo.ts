import { Model, model, models, Schema } from "mongoose";

import CartMongoContainer from "../../containers/mongodb/CartMongoContainer";
import { ICart } from "../../interfaces";

const cartSchema = new Schema({
  id: { type: Number, required: true },
  productos: { type: Array, required: true },
  timestamp: { type: Number, required: true },
});

const Cart: Model<ICart> = models.Cart || model("carts", cartSchema);

class CartDaoMongo extends CartMongoContainer {
  constructor() {
    super(Cart);
  }
}

export default CartDaoMongo;
