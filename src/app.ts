import dotenv from "dotenv";
import express, { Request } from "express";
import path from "path";

import { cartRoutes, productsRoutes } from "./routes";

// Create Express server
const app = express();
dotenv.config();
// Express configuration
app.set("port", process.env.PORT || 8080);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  express.static(path.join(__dirname, "../public"), { maxAge: 31557600000 })
);

app.use("/api/productos", productsRoutes);
app.use("/api/carrito", cartRoutes);

//Any other route will show an 404 error message
app.use("/*", (req: Request, res) => {
  console.log(req.headers);
  res.status(404).json({
    error: "Not found",
    message: `Route: ${req.baseUrl} is not implemented.`,
  });
});
export default app;
