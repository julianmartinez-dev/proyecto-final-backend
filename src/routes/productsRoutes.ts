import { Router } from "express";

const router = Router();
router.get("/", (req, res) => {
  res.send("from product routes");
});

export default router;
