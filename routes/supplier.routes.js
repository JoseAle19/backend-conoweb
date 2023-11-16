import { Router } from "express";
import { listSuppliers } from "../controllers/suppliercontroller.js";

const router = Router();
router.get("/", (req, res) => {
  res.send("rutas de proveedores");
});
router.get('/list', listSuppliers)

export default router;