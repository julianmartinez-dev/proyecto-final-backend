import ContainerFile from "../../containers/ContainerFiles";
import { IProduct } from "../../interfaces";

class ProductsDaoFile extends ContainerFile {
  constructor(filePath: string) {
    super(filePath);
  }

  addProduct = async (product: IProduct): Promise<number> => {
    try {
      const document = await this.readFile();
      const productList: IProduct[] = await JSON.parse(document);

      productList.length
        ? (product.id = productList[productList.length - 1].id + 1)
        : (product.id = 1);

      productList.push(product);
      await this.writeFile(JSON.stringify(productList, null, 2));
      return product.id;
    } catch (error) {
      throw new Error("Error saving file: " + error);
    }
  };

  getItem = async (id?: number): Promise<IProduct> => {
    try {
      //Get products from file
      const data = await this.readFile();
      const products = await JSON.parse(data);

      //If id is not provided, return all products
      return id
        ? products.find((product: IProduct) => product.id === id) || null
        : products;
    } catch (error) {
      throw new Error(`Error reading file: ` + error);
    }
  };

  deleteById = async (id: number): Promise<void> => {
    try {
      const data = await this.readFile();
      const products = await JSON.parse(data);
      const productExist = products.some((p: IProduct) => p.id === id);

      if (!productExist) {
        throw new Error("Product doesnt exist");
      }

      const newProductList = products.filter(
        (product: IProduct) => product.id !== id
      );
      await this.writeFile(JSON.stringify(newProductList, null, 2));
    } catch (error) {
      throw new Error("Error deleting product: " + error);
    }
  };

  deleteAll = async (): Promise<void> => {
    try {
      super.deleteAll();
    } catch (error) {
      throw new Error("Error deleting products: " + error);
    }
  };

  updateProduct = async (id: number, product: IProduct): Promise<void> => {
    try {
      const data = await this.readFile();
      const products = await JSON.parse(data);
      const productExist = products.some((p: IProduct) => p.id === id);

      if (!productExist) {
        throw new Error("Product doesnt exist");
      }
      const newProductList = products.filter(
        (product: IProduct) => product.id !== id
      );
      product.id = id;
      newProductList.push(product);

      await this.writeFile(JSON.stringify(newProductList, null, 2));
    } catch (error) {
      throw new Error(error as string);
    }
  };
}

export default ProductsDaoFile;
