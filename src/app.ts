import express from "express";
import path from "path";

import cartRouter from "./routes/cartRoutes";
import productsRouter from "./routes/productsRoutes";

// Create Express server
const app = express();

// Express configuration
app.set("port", process.env.PORT || 8080);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  express.static(path.join(__dirname, "../public"), { maxAge: 31557600000 })
);

app.use("/api/productos", productsRouter);
app.use("/api/carrito", cartRouter);
export default app;
