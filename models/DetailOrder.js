import { connection } from "../config/connectionDb.js";

class DetailOrder {
  constructor() {
    this.con = connection;
  }

  createDetailOrder({ id_order, id_product, quantity, price, total }) {
    return new Promise((resolve, reject) => {
      this.con.query(
        `
        insert into DetailOrder (id_order, id_product, quantity, price, total) values(?,?,?,?,?)`,
        [id_order, id_product, quantity, price, total],
        (error, result) => {
          if (error) {
            console.log("error", error);
            reject(new Error("Database error"));
          } else {
            resolve("Detail order created");
          }
        }
      );
    });
  }

  // Order por usuario
  findByUserId = ({ id_costumer, id_purchase }) => {
    return new Promise((resolve, reject) => {
      this.con.query(
        ` SELECT  
        product.description, 
        product.image, 
        detailorder.quantity as quantity_bought, 
        detailorder.price,
        product.price * detailorder.quantity 
        as price_per_quantity FROM detailorder
        INNER JOIN product on detailorder.id_product = product.id 
        INNER JOIN purchase on detailorder.id_order = purchase.id
        INNER JOIN users on purchase.id_client = users.id
        WHERE users.id = ? and purchase.id = ?`,
        [id_costumer, id_purchase],
        (err, result) => {
          if (err) {
            reject(new Error(`Database error ${err}`));
          } else {
            resolve(result);
          }
        }
      );
    });
  };
  findByUserProducts = ({ id_purchase }) => {
    return new Promise((resolve, reject) => {
      this.con.query(
        `SELECT  
        id_product,
        detailorder.quantity as quantity_bought
         FROM detailorder
         INNER join purchase on detailorder.id_order = purchase.id
        WHERE   purchase.id = ?`,
        [ id_purchase],
        (err, result) => {
          if (err) {
            reject(new Error(`Database error ${err}`));
          } else {
            resolve(result);
          }
        }
      );
    });
  };

  
}

export default DetailOrder;
