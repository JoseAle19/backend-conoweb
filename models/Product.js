import { connection } from "../config/connectionDb.js";

class ProductModel {
  constructor() {
    this.con = connection;
  }

  findByid({ id }) {
    return new Promise((resolve, reject) => {
      this.con.query(
        `SELECT * from product where id = ?`,
        [id],
        (err, result) => {
          if (err) {
            reject(new Error(`Database error  ${err}`));
          } else {
            if (result.length < 1) {
              reject({
                status: false,
                message: `Sin coincidencias con ese id`,
                product: [],
              });
            } else {
              resolve({
                status: true,
                message: `Producto encontrado`,
                product: result[0],
              });
            }
          }
        }
      );
    });
  }

  find() {
    return new Promise((resolve, reject) => {
      this.con.query(
        `select Product.id, Product.name as product_name, Product.description as product_description, Product.quantity as product_quantity, Product.image as product_image, units.name as product_unit, Product.price as product_price, Category.id as category_id,Category.name as category_name, Supplier.id as supplier_id,Supplier.name as supplier_name, Supplier.contact_name as supplier_contact_name, Supplier.phone as supplier_phone, Supplier.company_name as supplier_company_name FROM Product inner join Category on Product.id_category = Category.id inner join Supplier on Product.id_supplier = Supplier.id inner join units on product.id_unit = units.id;
        `,
        (err, result) => {
          if (err) {
            reject(new Error("Database error"));
          }
          if (result.length == 0) {
            resolve([]);
          } else {
            resolve(result);
          }
        }
      );
    });
  }

  createProduct = ({
    name,
    description,
    quantity,
    id_unit,
    price,
    image,
    category,
    supplier,
  }) => {

    return new Promise((resolve, reject) => {
      this.con.query(
        `insert into Product(name, description, quantity, id_unit, price,image,id_category,id_supplier) values(?,?,?,?,?,?,?,?);`,
        [name, description, quantity, id_unit, price, image, category, supplier],
        (error, result) => {
          if (error) {
            reject(new Error("Database error"));
          } else {
            resolve({
              status: true,
              message: "Product created successfully",
              id: result.insertId,
            });
          }
        }
      );
    });
  };

  deleteById({ id }) {
    return new Promise((resolve, reject) => {
      this.con.query(
        `DELETE from product WHERE id = ?`,
        [id],
        (error, result) => {
          if (error) {
            reject({
              status: false,
              message: "Database error",
            });
          }
          if (result.affectedRows < 1) {
            resolve({
              status: false,
              message: "El producto no existe",
            });
          } else {
            resolve({
              status: true,
              message: "Producto eliminado",
            });
          }
        }
      );
    });
  }

  updateById({
    name,
    description,
    quantity,
    id_unit,
    price,
    image,
    id_category,
    id_supplier,
    id,
  }) {
 

    return new Promise((resolve, reject) => {
      this.con.query(
        `UPDATE product set name=?, description=?, quantity=?,id_unit=?, price=?, image =?, id_category= ?, id_supplier = ? WHERE id = ?`,
        [
          name,
          description,
          quantity,
          id_unit,
          price,
          image,
          id_category,
          id_supplier,
          id,
        ],
        (err, result) => {
          if (err) {
            reject(new Error("Database error"));
          } else {
            resolve("Produc updated");
          }
        }
      );
    });
  }
}

export default ProductModel;
