import CartMongoContainer from "../../containers/mongodb/CartMongoContainer";
import { Cart } from "../../models/Carts";

class CartDaoMongo extends CartMongoContainer {
  constructor() {
    super(Cart);
  }
}

export default CartDaoMongo;
