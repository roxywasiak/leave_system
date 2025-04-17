import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

console.log('DB_USER:', process.env.DB_USER);  // Should print your MySQL username
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);  // Should print your MySQL password

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

pool.getConnection()
  .then((connection) => {
    console.log('Connected to MySQL database');
    connection.release();
  })
  .catch((err) => {
    console.error('Error connecting to MySQL:', err);
  });

export default pool;