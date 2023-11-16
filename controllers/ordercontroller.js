import Order from "../models/Order.js";
import DetailOrder from "../models/DetailOrder.js";
import Product from "../models/Product.js";
// Inicializar el modelo de ordenes
const OrderModel = new Order();
const OrderDetaildModel = new DetailOrder();
const ProductModel = new Product();
// Inicializar el modelo de los detalles de cada pedido

const DetailOrderModel = new DetailOrder();
// Obtenr todos los pedidos

export const getAllOrders = async (req, res) => {
  try {
    let response = await OrderModel.find();

    for (let i = 0; i < response.length; i++) {
      const order = response[i];
      const detailOrder = await DetailOrderModel.findByUserProducts({
        id_purchase: order.id,
      });
      response[i].products = detailOrder;
    }

    res.json({ status: true, message: "Orders found", orders: response });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: "orders not found",
      err: error,
    });
  }
};

export const createOrder = async (req, res) => {
  // return console.log("piilin quieres llenar mi bd ");
  // El array de productos
  const products = JSON.parse(req.body.products);
  try {
    // contador para saber si los productos ya fueron agregados
    let completedOrder = 0;
    const orderId = await OrderModel.createOrder(req.body);
    // Agrega el id del pedido que ya se hizo
    req.body.id_order = orderId;
    for (let i = 0; i < products.length; i++) {
      const detailOrderData = {
        ...req.body, // Clona req.body para crear un objeto independiente
        id_order: orderId, // Asigna el ID de la orden
        id_product: products[i].id, // Asigna el ID del producto desde el array de productos
        quantity: products[i].quantity,
        price: products[i].price,
        total: products[i].price * products[i].quantity,
      };
      await OrderDetaildModel.createDetailOrder(detailOrderData);
      // Incremntamos la variable en cada creacion de un producto
      completedOrder++;
    }
    if (completedOrder === products.length) {
      return res.json({
        status: true,
        message: "Order created",
        data: orderId,
      });
    }
  } catch (e) {
    return res.json({
      status: false,
      message: "Error",
      error: e,
    });
  }
};

export const getorderByOrderId = async (req, res) => {
  const { costumer, purchase } = req.params;
  let total = 0;
  const data = {
    id_costumer: costumer,
    id_purchase: purchase,
  };
  try {
    const { date_order, status_order } = await OrderModel.findbyId(data);

    const response = await DetailOrderModel.findByUserId(data);
    // Sumar todo los tottal de los productos
    response.forEach((element) => {
      total += element.price_per_quantity;
    });
    return res.json({
      status: true,
      message: "Order found",
      status_order,
      date_order,
      products: response,
      total,
    });
  } catch (error) {
    return res.json({
      status: false,
      message: "Error",
      error,
    });
  }
};

export const getOrdersByuser = async (req, res) => {
  const { costumer } = req.params;
  let total = 0;
  const data = {
    id_client: costumer,
  };

  try {
    let response = await OrderModel.findByUserId(data);

    // Obtener los detalles de cada pedido
    for (let i = 0; i < response.length; i++) {
      const { id } = response[i];
      const detailOrder = await DetailOrderModel.findByUserId({
        id_costumer: costumer,
        id_purchase: id,
      });
      // Sumar todo los tottal de los productos
      detailOrder.forEach((element) => {
        total += element.price_per_quantity;
        response[i].total = total;
      });
      total = 0;
      // Agregar los productos al pedido
      response[i].products = detailOrder;
      // Agregar el total al pedido
    }

    return res.json({
      status: true,
      message: "Order found",
      count_orders: response.length,
      orders: response,
    });
  } catch (error) {
    return res.json({
      status: false,
      message: "Error",
      error,
    });
  }
};

export const processOrder = async (req, res) => {
  const { products, status } = req.body;

  try {
    for (let i = 0; i < products.length; i++) {
      const productDb = await ProductModel.findByid({
        id: products[i].id_product,
      });
      // Desestructurar el product
      const { product } = productDb;

      const resProducts = ProductModel.updateById({
        name: req.body.name || product.name, // Usa el valor de la base de datos si no se proporciona uno nuevo
        description: req.body.description || product.description,
        quantity: products[i].quantity,
        id_unit: req.body.id_unit || product.id_unit,
        price: req.body.price || product.price,
        image: req.body.image,
        id_category: req.body.id_category || product.id_category,
        id_supplier: req.body.id_supplier || product.id_supplier,
        id: products[i].id_product,
      });
    }
    console.log('productos actualizados');
    
    // const response = await OrderModel.proceedOrder(id, status);
    return res.json({
      status: true,
      message: "Order updated",
      data: response,
    });
  } catch (error) {
    return res.json({
      status: false,
      message: "Error",
      error,
    });
  }
};
