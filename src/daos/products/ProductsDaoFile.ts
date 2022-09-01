import { config } from "../../config";
import CartFileContainer from "../../containers/files/CartFileContainer";

class ProductsDaoFile extends CartFileContainer {
  constructor() {
    super(config.fileSystem.dirProducts);
  }
}

export default ProductsDaoFile;
