import { Pool } from "pg";

let conn: any;

if (!conn) {
  conn = new Pool({
    user: "postgres",
    password: "postgres",
    host: "194.163.167.188",
    port: 5432,
    database: "postgres",
  });
}

export { conn };
