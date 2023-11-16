import { connection } from "../config/connectionDb.js";

class CategoryModel {
    constructor() {
        this.con  = connection
    }
listCategories() {
    return new Promise((resolve, reject) => {
        this.con.query("SELECT * FROM category", (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
}
create =({name})=>{
    return Promise((resolve, reject)=>{
        this.con.query(
            `insert into category(name) values(?)`,
            [name],
            (err, result)=>{
                if (err) reject(err);
                resolve(result);
            }
        );
    })
}
}


export default CategoryModel;