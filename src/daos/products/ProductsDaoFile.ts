import { config } from "../../config";
// import CartFileContainer from "../../containers/files/CartFileContainer";
import ProductFileContainer from "../../containers/files/ProductFileContainer";

class ProductsDaoFile extends ProductFileContainer {
  constructor() {
    super(config.fileSystem.dirProducts);
  }
}

export default ProductsDaoFile;
