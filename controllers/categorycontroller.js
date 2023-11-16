import Category from "../models/Category.js";
// Instanciar el modelo de las categorías
const CategoryModel = new Category();


// Listar todas las categorías
export const listCategories = async (req, res) => {
  try {
    const categories = await CategoryModel.listCategories();
    res.status(200).json({
      message: "Lista de categorías",
      status: true,
      categories,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      status: false,
      categories: [],
    });
  }
};


export const createCategory = async (req, res) => {


  try {
    const category = await CategoryModel.create(req.body)
    res.status(200).json({
      message: "Categoría creada",
      status: true,
      category,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      status: false,
      category: [],
    });
  }
}
