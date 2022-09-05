import * as admin from "firebase-admin";
import mongoose from "mongoose";

import serviceAccount from "./firebase.json";
import { config } from "./index";

//MongoDB
export const mongoConnect = async () => {
  try {
    await mongoose.connect(config.mongoDB.url);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error);
  }
};

export const mongoDisconnect = async () => {
  try {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  } catch (error) {
    console.log(error);
  }
};

//Firebase

export const connectFirebase = async () => {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
    });
    console.log("Firestore connected");
  } catch (error) {
    console.log(error);
  }
};
