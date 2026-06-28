import environments from "../config/environments.js";
import mysql2 from "mysql2/promise";

const { database } = environments;

const connection=mysql2.createPool({
    host: database.host,
    port: database.db_port,
    database: database.name,
    user: database.user,
    password: database.password
});
export default connection;