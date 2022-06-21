import express from "express";
const router = express.Router();
import handleValidation from "../middlewares/handle-validations";
import validators from "../models/view-models/index";

import { postHandler, csvHandler, getAllHandler, emailHandler } from "../controller/employee_controller";

router.post(
    "/add-employee",
    handleValidation(validators.employeeSchemaValidate, "body"),
    postHandler
);
router.post(
    "/upload-employees-csv",
    handleValidation(validators.csvSchemaValidate, "files"),
    csvHandler);

router.get(
    "/employees",
    handleValidation(validators.employeesQuerySchemaValidate, "query"),
    getAllHandler);

router.post(
    "/send-email",
    handleValidation(validators.emailDataValidate,"body"),
    emailHandler)
 
export default router