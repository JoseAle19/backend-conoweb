import { Router } from "express";
import { createOrder, getOrdersByuser, getorderByOrderId, getAllOrders} from "../controllers/ordercontroller.js";

const router = Router();

router.get("/", (req, res) => {
  res.send("endpoints to orders");
});

router.post('/add-order', createOrder)
router.get('/getById/:costumer/:purchase', getorderByOrderId)
router.get('/getByUser/:costumer', getOrdersByuser)
router.get('/getALl', getAllOrders)

export default router;
