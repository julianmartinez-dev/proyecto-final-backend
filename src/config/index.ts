import * as admin from "firebase-admin";

import serviceAccount from "./firebase.json";

try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  });
  console.log("Firestore connected");
} catch (error) {
  console.log(error);
}

export const config = {
  mongoDB: {
    url: process.env.MONGO_URL || "",
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
  fileSystem: {
    dirProducts: "./src/containers/files/products.json",
    dirCarts: "./src/containers/files/carts.json",
  },
  firebase: {
    db: admin.firestore(),
  },
};
