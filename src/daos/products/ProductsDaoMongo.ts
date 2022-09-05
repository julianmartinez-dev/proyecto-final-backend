import ProductMongoContainer from "../../containers/mongodb/ProductMongoContainer";
import { Product } from "../../models/Products";

class ProductsDaoMongo extends ProductMongoContainer {
  constructor() {
    super(Product);
  }
}

export default ProductsDaoMongo;
