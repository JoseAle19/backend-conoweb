import { Router } from "express";
// Inicializar router
const router = Router();

router.get("/", (req, res) => {
    console.log('Este es en endpoint de prueba ya que no jala mi api xd');
    
});

export default router;
