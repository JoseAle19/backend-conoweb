import { connection } from "../config/connectionDb.js";
import { deleteImage, uploadimage } from "../helpers/uploadimage.js";
import Product from "../models/Product.js";

// Inicializar modelos
const ProductModel = new Product();

export const createProductcontroller = async (req, res) => {
  const image =
    req.files?.photo !== undefined
      ? await uploadimage({ photo: req.files.photo })
      : "";

  req.body.image = image;
  try {
    const product = await ProductModel.createProduct(req.body, req.files);
    return res.send(product);
  } catch (e) {
    return res.send(e);
    throw e;
  }
};

// Listar todo los productos
export const lisProductscontroller = async (req, res) => {
  try {
    const data = await ProductModel.find();
    return res.status(200).json({
      status: true,
      message: "Lista de productos",
      products: data,
    });
  } catch (e) {
    return res.status(400).json({
      status: false,
      message: 'Error al obtener los productos',
      products: [],
    });
  }
};

export const deleteProductcontroller = async (req, res) => {
  try {
    const reponseById = await ProductModel.findByid(req.body);
    if (reponseById.status) {
      const response = await ProductModel.deleteById(reponseById.product);
      await deleteImage(reponseById.product);
      res.status(200).json(response);
    } else {
      res.status(400).json(reponseById);
    }
  } catch (e) {
    res.status(400).json(e);
  }
};

export const updateProductController = async (req, res) => {
  
  try {
    const productDb = await ProductModel.findByid(req.body);
    // Desestructurar el product
    const { product } = productDb;

    if (req.files?.photo) {
      
      // Si tiene Una imagen el prodcto hay que eliminar la imagen, esperamos que se elimine
      await deleteImage(product);

      //Si hay imagen en el request files subir imagen
      const image =
        req.files?.photo !== undefined
          ? await uploadimage({ photo: req.files.photo })
          : "";
      req.body.image = image;
    } else {
      
      // si no viene imagen el el req,files es que quiere mantener la imagen que tiene
      req.body.image = product.image;
    }

    const data = {
      name: req.body.name || product.name, // Usa el valor de la base de datos si no se proporciona uno nuevo
      description: req.body.description || product.description,
      quantity: req.body.quantity || product.quantity,
      id_unit: req.body.id_unit || product.id_unit,
      price: req.body.price || product.price,
      image: req.body.image,
      id_category: req.body.id_category || product.id_category,
      id_supplier: req.body.id_supplier || product.id_supplier,
      id: req.body.id,
    };

    const updateProduct = await ProductModel.updateById(data);
    return res.status(200).json({
      status: true,
      message: updateProduct,
    });
  } catch (e) {
    return res.status(404).json({
      status: true,
      message: e,
    });
  }
};
