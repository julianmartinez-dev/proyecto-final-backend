import { config } from "../../config";
import { IProduct } from "../../interfaces";
import { generateID } from "../../utils/generateID";

class ProductFirebaseContainer {
  private db: FirebaseFirestore.Firestore;
  private query: FirebaseFirestore.CollectionReference;
  constructor() {
    this.db = config.firebase.db;
    this.query = this.db.collection("products");
  }

  addProduct = async (product: IProduct): Promise<number> => {
    try {
      const newID = generateID();
      const doc = this.query.doc(`${newID}`);
      await doc.create({ ...product, id: newID, timestamp: Date.now() });
      return Number(doc.id);
    } catch (error) {
      throw new Error("error adding product");
    }
  };
  getItem = async (id?: number): Promise<IProduct | IProduct[]> => {
    try {
      if (id) {
        const doc = this.query.doc(`${id}`);
        const item = await doc.get();
        return item.data() as IProduct;
      } else {
        const querySnapshot = await this.query.get();
        const docs = querySnapshot.docs;
        return docs.map((doc) => doc.data() as IProduct);
      }
    } catch (error) {
      throw new Error("error getting product");
    }
  };

  deleteById = async (id: number): Promise<void> => {
    try {
      const doc = this.query.doc(`${id}`);
      await doc.delete();
    } catch (error) {
      throw new Error("error deleting product");
    }
  };

  updateProduct = async (id: number, product: IProduct): Promise<void> => {
    try {
      const doc = this.query.doc(`${id}`);
      const item = (await doc.get()).data();

      if (!item) {
        throw new Error("Product doesnt exist");
      }

      await doc.update({
        codigo: product.codigo || item.codigo,
        descripcion: product.descripcion || item.descripcion,
        foto: product.foto || item.foto,
        precio: product.precio || item.precio,
        stock: product.stock || item.stock,
        timestamp: item.timestamp,
        nombre: product.nombre || item.nombre,
        id: item.id,
      });
    } catch (error) {
      throw new Error("error updating product");
    }
  };
}

export default ProductFirebaseContainer;
