import Supplier from "../models/Supplier.js";
// Instanciar el modelo de los porveedores
const SupplierModel = new Supplier();

// Listar todos los proveedores
export const listSuppliers = async (req, res) => {
  try {
    const suppliers = await SupplierModel.find();
    res.status(200).json({
      message: "Lista de proveedores",
      status: true,
      suppliers,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      status: false,
      suppliers: [],
    });
  }
};


export const createSupplier = async (req, res) => {
  try {
    const supplier = await SupplierModel.create(req.body);
    res.status(200).json({
      message: "Proveedor creado",
      status: true,
      supplier,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      status: false,
      supplier: {},
    });
  }
}