import mysql from "mysql2/promise";
import db from "./db";

// Open the connection to MySQL server
async function createDBIfNotExists() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
    });
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`);
}

export const connectDB = async () => {
    db.sync();
    await createDBIfNotExists();
    try {
        await db.authenticate();
        console.log(`Database connected successfully`);
    } catch (error) {
        console.log(`Unable to connect to the database:  ${error.message}`);
    }
}   
