import { Router } from "express";
import { listCategories } from "../controllers/categorycontroller.js";
const router = Router();

router.get("/", (req, res) => {
  res.send("rutas de categorias");
});

router.get("/list", listCategories  )

export default router;