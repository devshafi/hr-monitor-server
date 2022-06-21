import Joi from "Joi";

const employeesQuerySchema = Joi.object().keys({
    offset: Joi.number().integer().min(1).required(),
    limit: Joi.number().integer().min(1).max(20).required(),
})

const validateEmployeesQuery = (data) => {
    const result = employeesQuerySchema.validate(data);
    return result;
}

export default validateEmployeesQuery;