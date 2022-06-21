import { GeneralError } from "./../utils/errors.js";

export const handleErrors = async (err, req, res, next) => {
    if (err instanceof GeneralError) {
        const code = err.getCode();
        return res.status(code).json({ success: err.success, name: err.name, message: err.message })
    }

    else if (err.name === "SequelizeUniqueConstraintError") {
        const errorPath = err.errors[0].path;
        const errorValue = err.errors[0].value;
        const errorMessage = `Value ${errorValue} already exists for the field: ${errorPath}`;
        return res.status(400).json({ success: false, name: "DuplicateValueError", message: errorMessage })

    }
    else if (err.name === "SequelizeValidationError") {
        const errorMessage = err.errors[0].message;
        return res.status(400).json({ success: false, name: "ValidationError", message: errorMessage })
    }

    // Something unwanted happened to the server
    // we can send notification to developer if this error happens
    return res.status(500).json({
        name: "Internal server error",
        message: err.message
    })
}