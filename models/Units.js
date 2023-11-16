import { connection } from "../config/connectionDb.js";

class UnitModel {
  constructor() {
    this.con = connection;
  }
  find = () => {
    return new Promise((resolve, reject) => {
      this.con.query("SELECT * FROM units", (err, result) => {
        if (err) reject(err);
        if (result.length === 0) reject("No se encontraron unidades");
        resolve(result);
      });
    });
  };
}


export  default UnitModel;