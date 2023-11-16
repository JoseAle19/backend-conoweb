import { connection } from "../config/connectionDb.js";
import { v4 as uuid } from "uuid";
class OrderModel {
  constructor() {
    this.con = connection;
  }

  createOrder({
    status_order = "pending",
    number_order = '',
    note_customer,
    discounts = 0,
    id_costumer,
  }) {
    // Obtener la fecha actual
    const date = new Date();
      
    // Formatear la fecha en el formato de MySQL
    const formateDate = date.toISOString().slice(0, 19).replace("T", " ");

    return new Promise((resolve, reject) => {
      this.con.query(
        `insert into
          purchase (
              date_order,
              status_order,
              number_order,
              note_client,
              discounts,
              id_client
          ) values (?,?,?,?,?,?)`,
        [
          formateDate,
          status_order,
          uuid(),
          note_customer,
          discounts,
          id_costumer,
        ],
        (err, result) => {
          if (err) {
            reject(new Error(`Database error ${err}`));
          } else {
            resolve(result.insertId.toString());
          }
        }
      );
    });
  }
  findbyId = ({ id_purchase }) => {
    return new Promise((resolve, reject) => {
      this.con.query(
        `SELECT * FROM purchase WHERE id = ?`,
        [id_purchase],
        (err, result) => {
          if (err) {
            reject(new Error(`Database error ${err}`));
          }

          if (result.length === 0) {
            reject(`Order not found`);
          } else {
            resolve(result[0]);
          }
        }
      );
    });
  };
  // Order por usuario
  findByUserId = ({ id_client }) => {

    return new Promise((resolve, reject) => {
      this.con.query(
        `SELECT * FROM purchase WHERE id_client = ?`,
        [id_client],
        (err, result) => {
          if (err) {
            reject(new Error(`Database error ${err}`));
          }

          if (result.length === 0) {
            reject(`Order not found`);
          } else {
            resolve(result);
          }
        }
      );
    });
  };
  find = () => {
    return new Promise((resolve, reject) => {
      this.con.query(
        `SELECT 
    o.*,
    u.name,
    u.email,
    u.photo,
    SUM(d.total) AS order_total
FROM 
    purchase o
JOIN 
    detailorder d ON o.id = d.id_order
JOIN users u ON u.id = o.id_client
GROUP BY 
    o.id;`,
        (err, result) => {
          if (err) {
            reject(new Error(`Database error ${err}`));
          }

          if (result.length === 0) {
            reject(`Orders not found`);
          } else {
            resolve(result);
          }
        }
      );
    });
  };
}

export default OrderModel;
