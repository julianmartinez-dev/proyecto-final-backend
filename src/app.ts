import express from "express";
import path from "path";

import { cartRoutes, productsRoutes } from "./routes";

// Create Express server
const app = express();

// Express configuration
app.set("port", process.env.PORT || 8080);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  express.static(path.join(__dirname, "../public"), { maxAge: 31557600000 })
);

app.use("/api/productos", productsRoutes);
app.use("/api/carrito", cartRoutes);
export default app;
