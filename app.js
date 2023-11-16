import Server from "./models/server.js";
import env from 'dotenv';
env.config()
const server =new  Server()
server.listen()


