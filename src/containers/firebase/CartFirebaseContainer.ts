import { config } from "../../config";
import { ICart, IProduct } from "../../interfaces";

class CartFirebaseContainer {
  private db: FirebaseFirestore.Firestore;
  private query: FirebaseFirestore.CollectionReference;
  constructor() {
    this.db = config.firebase.db;
    this.query = this.db.collection("carts");
  }

  getAllCarts = async (): Promise<ICart[]> => {
    const querySnapshot = await this.query.get();
    const docs = querySnapshot.docs;
    return docs.map((doc) => doc.data() as ICart);
  };
  //Create Cart
  createCart = async (cart: ICart): Promise<number> => {
    try {
      const carts = await this.getAllCarts();
      let newID: number;

      if (carts.length === 0) newID = 1;
      else newID = Number(carts[carts.length - 1].id) + 1;

      const doc = this.query.doc(`${newID}`);
      await doc.create({ ...cart, id: newID });
      return newID;
    } catch (error) {
      throw new Error("error");
    }
  };
  //Get Cart
  getCart = async (id: number): Promise<ICart | null> => {
    try {
      const doc = this.query.doc(`${id}`);
      const cart = await doc.get();
      if (!cart.exists) return null;
      return cart.data() as ICart;
    } catch (error) {
      throw new Error("error");
    }
  };

  //deleteById

  deleteById = async (id: number): Promise<void> => {
    try {
      const carts = await this.getAllCarts();
      const cartExist = carts.some((c) => c.id === Number(id));
      if (!cartExist) {
        throw new Error("Cart doesnt exist");
      }
      const doc = this.query.doc(`${id}`);
      await doc.delete();
      //TODO: Verificar el metodo
    } catch (error) {
      throw new Error("error");
    }
  };

  //deleteProduct
  deleteProduct = async (cart: ICart, productID: number): Promise<void> => {
    const doc = this.query.doc(`${cart.id}`);
    await doc.update({
      productos: cart.productos.filter((p) => p.id !== productID),
    });
  };

  //addProduct
  addProduct = async (cart: ICart, product: IProduct): Promise<void> => {
    try {
      const doc = this.query.doc(`${cart.id}`);
      await doc.update({
        productos: [...cart.productos, product],
      });
    } catch (error) {
      throw new Error("Error adding product");
    }
  };
}

export default CartFirebaseContainer;
