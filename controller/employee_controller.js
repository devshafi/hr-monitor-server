import convertCSVToArray from "../utils/read_csv";
import { saveEmployee, saveEmployees, getAllEmployees, sendEmail } from "../services/employee_services";
import { BadRequest } from "../utils/errors";

export const postHandler = async (req, res, next) => {

    try {
        const employee = req.body;
        await saveEmployee(employee);
        res.status(201).send(
            {
                success: true,
                message: "Added successfully",
            })
    } catch (error) {
        return next(error, req, res);
    }
}

export const getAllHandler = async (req, res, next) => {
    try {
        const query = req.query;
        const employees = await getAllEmployees(query);
        res.status(200).send({
            success: true,
            message: "Fetched successfully",
            data: employees
        });

    } catch (error) {
        return next(error, req, res);
    }
}

export const csvHandler = async (req, res, next) => {
    try {

        const file = req.files?.csv;
        if (file.mimetype !== "text/csv") {
            throw new BadRequest(`File type must be in CSV format`)
        }
        const filePath = file.tempFilePath;
        const { totalRows, validRows, invalidRows, validEntries } = await convertCSVToArray(filePath);
        await saveEmployees(validEntries);
        res.status(201).send({
            success: true,
            message: `Total row(s): ${totalRows}, Uploaded row(s) :${validRows}, Discarded row(s): ${invalidRows}`,
        })

    } catch (error) {
        return next(error, req, res);
    }

}

export const emailHandler = async (req, res, next) => {
    try {
        const emailData = req.body;
        await sendEmail(emailData);
        res.status(200).send({
            success: true,
            message: "Email sent successfully",
        })

    } catch (error) {
        return next(error, req, res);
    }

}