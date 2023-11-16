import { Router  } from "express";
import { createProductcontroller, lisProductscontroller, deleteProductcontroller, updateProductController } from "../controllers/productcontroller.js";
const router = Router();


router.get("/", (req, res) => {
    res.send('Este es en endpoint para los productos');
    
});

router.post("/add-product", createProductcontroller);
router.get('/list-products', lisProductscontroller  )
router.post('/delete-product', deleteProductcontroller  )
router.post('/update-product', updateProductController  )






export default router