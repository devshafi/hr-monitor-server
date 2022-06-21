import Joi from "Joi";

const csvSchema = Joi.object().keys({
    csv: Joi.required()
})

const validateCSV = (data) => {
    const result = csvSchema.validate(data);
    return result;
}

export default validateCSV;