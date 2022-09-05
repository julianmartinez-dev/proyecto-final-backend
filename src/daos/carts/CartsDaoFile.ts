import { config } from "../../config";
import CartFileContainer from "../../containers/files/CartFileContainer";

class CartsDaoFile extends CartFileContainer {
  constructor() {
    super(config.fileSystem.dirCarts);
  }
}

export default CartsDaoFile;
