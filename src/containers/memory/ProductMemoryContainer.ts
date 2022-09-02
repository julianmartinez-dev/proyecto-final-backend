import { IProduct } from "../../interfaces";

class ProductMemoryContainer {
  private productList: IProduct[];
  constructor() {
    this.productList = [];
  }
  addProduct = (product: IProduct): number => {
    this.productList.length
      ? (product.id = this.productList[this.productList.length - 1].id + 1)
      : (product.id = 1);
    product.timestamp = Date.now();
    product.precio = Number(product.precio); 
    this.productList.push(product);
    return product.id;
  };

  getItem = (id?: number): IProduct | IProduct[] | null => {
    return id
      ? this.productList.find((product: IProduct) => product.id === id) || null
      : this.productList;
  };

  deleteById = (id: number): void => {
    const productExist = this.productList.some((p: IProduct) => p.id === id);
    if (!productExist) {
      throw new Error("Product doesnt exist");
    }
    this.productList = this.productList.filter(
      (product: IProduct) => product.id !== id
    );
  };

  deleteAll = (): void => {
    this.productList = [];
  };

  updateProduct = (id: number, product: IProduct): void => {
    const productExist = this.productList.some((p: IProduct) => p.id === id);
    if (!productExist) {
      throw new Error("Product doesnt exist");
    }
    this.productList = this.productList.map((p: IProduct) => {
      if (p.id === id) {
        p = product;
      }
      return p;
    });
  };
}

export default ProductMemoryContainer;
