// setup db
import db from "./db.js"
export const connectDB = async () => {
    db.sync();
    try {
        await db.authenticate();
        console.log(`Database connected successfully`);
    } catch (error) {
        console.log(`Unable to connect to the database:  ${error.message}`);
    }
}   