import { Router } from "express";
import { getUnits } from "../controllers/unitController.js";
const router = Router();

router.get("/", (req, res) => {
    res.send("Endpoint de unidades");
});


router.get("/list", getUnits);

export default router;