import express from "express";
import cors from "cors";
import fileUpload from "express-fileupload";
import { } from "dotenv/config"
import { connectDB } from "./config/setup_db.js";
import Router from "./routes/routes.js"
import { handleErrors } from "./middlewares/handle_errors.js";

const app = express()

// connecting database
connectDB();

// parse requests of content-type - application/json
app.use(express.json());

// enabling all domain for development
app.use(cors());

// for parsing application/x-www-form-urlencoded
// app.use(express.urlencoded({ extended: true }));

// file upload
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/"
}));

app.use(Router);
app.use(handleErrors)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}`)
})