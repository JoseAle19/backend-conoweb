import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.send("endpoints to detail orders");
});

// router.post('add-detail-order', creatde)

export default router;
