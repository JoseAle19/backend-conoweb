import { connection } from "../config/connectionDb.js";

class SupplierModel {
  constructor() {
    this.con = connection;
  }

  find() {
    return new Promise((resolve, reject) => {
      this.con.query("SELECT * FROM supplier", (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  }
  create = ({
    name, contact, phone, email, company
  }) => {
    return Promise((resolve, reject) => {
      this.con.query(
        `insert into Supplier(name, contact_name, phone, email, company_name) values(?, ?, ?, ?, ?)`,
        [name, contact, phone, email, company],
        (err, result) => {
          if (err) reject(err);
          resolve(result);
        }
      );
    });
  };
}

export default SupplierModel;
