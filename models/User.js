import { connection } from "../config/connectionDb.js";
import bcrypt from "bcryptjs";
class User {
  constructor() {
    this.con = connection;
  }
  login({ password, email }) {
    return new Promise((resolve, reject) => {
      this.con.query(
        "SELECT * FROM Users WHERE `email` = ?",
        [email],
        (err, result) => {
          if (err) {
            reject(new Error("Database error"));
            return;
          }
          if (result.length < 1) {
            // Ninguna cuenta con este correo
            reject("Correo o contraseña incorrectas");
            return;
          }
          const accountPass = result[0].password;
          //Comparar passwords si son las mismas
          const comparePassword = bcrypt.compareSync(password, accountPass);

          // valdiar si son las musmas
          if (!comparePassword) {
            // Password incorrecta
            reject("Correo o contraseña incorrectas");
            return;
          } else {
            resolve({
              message: "Usuario loggeado",
              user: result[0],
            });
            return;
          }
        }
      );
    });
  }

  register({ name, email, lastname, password, rol_id, imageProfile }) {
    return new Promise((resolve, reject) => {
      this.con.query(
        `insert into Users(name, lastname, email, password, rol_id, photo) 
        values (?,?,?,?,?,?)`,
        [name, lastname, email, password, rol_id, imageProfile],
        (err, result) => {
          if (err) {
            reject(new Error("Database error"));
          } else {
            resolve('User created successfully')
          }
        }
      );
    });
  }
}

export default User;
