import express from "express";
import { connection } from "../config/connectionDb.js";
import cors from "cors";
// Importar rutas
import authRoutes from "../routes/auth.routes.js";
import userRoutes from "../routes/user.routes.js";
import productsRoutes from "../routes/products.routes.js";
import ordersRoutes from "../routes/order.routes.js";
import categoryRoutes from "../routes/categories.routes.js";
import supplierRoutes from "../routes/supplier.routes.js";
import unitsRoutes from "../routes/unit.routes.js";

// Permitir archivos
import fileUpload from "express-fileupload";

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || "4000";
    // Inicializar los middlewares
    this.middlewares();
    // Inicializar la base de datos
    this.ConnectDatabase();
    // Llamar las todas las rutas
    this.routes();
  }
  // Middlewares (Policias xd)
  middlewares = () => {
    //Cargar archivos
    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
      })
    );
    this.app.use(
      cors({
        origin: [
          "http://localhost:5173",
          "https://r0pc83k9-5173.usw3.devtunnels.ms",
          'https://65518de38de2e17789af2486--delicate-axolotl-1bd17b.netlify.app',
        ],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
      })
    );
    this.app.use(express.json());
    this.app.use(express.static("public"));
  };
  // Conectar a la base de datos
  async ConnectDatabase() {
    await connection;
  }

  // Funcion de rutas
  routes = () => {
    this.app.use("/apiv1/auth", authRoutes);
    this.app.use("/apiv1/users", userRoutes);
    this.app.use("/apiv1/products", productsRoutes);
    this.app.use("/apiv1/order", ordersRoutes);
    this.app.use("/apiv1/supplier", supplierRoutes);
    this.app.use("/apiv1/category", categoryRoutes);
    this.app.use("/apiv1/units", unitsRoutes);
  };

  //  Iniciar el servidor
  listen() {
    this.app.listen(this.port, () => {
    console.log(new Date().toISOString().slice(0, 19).replace("T", " "));
          
      console.log(`Server on port ${this.port}`);
    });
  }
}
export default Server;
