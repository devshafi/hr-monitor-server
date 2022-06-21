import express from "express";
import cors from "cors";
import fileUpload from "express-fileupload";
import { } from "dotenv/config"
import { connectDB } from "./config/setup_db";
import Router from "./routes/routes"
import { handleErrors } from "./middlewares/handle_errors";

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