/* eslint-disable prettier/prettier */
import 'dotenv/config';

import CartDaoFirebase from './carts/CartDaoFirebase';
import CartDaoMongo from './carts/CartDaoMongo';
import CartsDaoFile from './carts/CartsDaoFile';
import CartsDaoMemory from './carts/CartsDaoMemory';
import ProductDaoFirebase from './products/ProductDaoFirebase';
import ProductsDaoFile from './products/ProductsDaoFile';
import ProductsDaoMemory from './products/ProductsDaoMemory';
import ProductsDaoMongo from './products/ProductsDaoMongo';

let productsDao: ProductsDaoFile | ProductsDaoMemory | ProductDaoFirebase | ProductsDaoMongo;
let cartDao: CartsDaoFile | CartsDaoMemory | CartDaoFirebase | CartDaoMongo

(async () => {switch (process.env.PERSISTENCE) {
  case 'json':
    const { default: fileDaoCarts } = await import("./carts/CartsDaoFile");
    const { default: fileDaoProducts } = await import('./products/ProductsDaoFile');
    cartDao = new fileDaoCarts();
    productsDao = new fileDaoProducts();
    console.log('Using JSON persistence');
    break;


  case 'mongodb':
    const { default: mongoDbDaoCarts } = await import('./carts/CartDaoMongo');
    const { default: mongoDbDaoProducts } = await import('./products/ProductsDaoMongo');
    cartDao = new mongoDbDaoCarts();
    productsDao = new mongoDbDaoProducts();
    console.log('Using MongoDB persistence');
    break;

    
  case 'firebase':
    const { default: DaoFirebaseCart } = await import('./carts/CartDaoFirebase');
    const { default: DaoFirebaseProduct } = await import('./products/ProductDaoFirebase');
    cartDao = new DaoFirebaseCart();
    productsDao = new DaoFirebaseProduct();
    console.log('Using Firebase persistence');
    break;


  default:
    const { default: memoryDaoCarts } = await import('./carts/CartsDaoMemory');
    const { default: memoryDaoProducts } = await import('./products/ProductsDaoMemory');
    cartDao = new memoryDaoCarts();
    productsDao = new memoryDaoProducts();
    console.log('Using in-memory persistence');
    break;
}
})();
export { cartDao,productsDao };
