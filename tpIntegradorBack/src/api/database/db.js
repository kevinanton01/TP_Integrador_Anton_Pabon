import environments from "../config/environments.js";
import mysql2 from "mysql2/promise";

const connection=mysql2.createPool({
    host: environments.database.host,
    user: environments.database.user,
    password: environments.database.password,
    database: environments.database.name
});
export default connection;