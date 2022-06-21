import Joi from "Joi";

const employeeSchema = Joi.object().keys({
    firstName: Joi.string().min(1).max(40).required(),
    lastName: Joi.string().min(1).max(40).required(),
    email: Joi.string().email().required()
})

const validateEmployee = (data) => {
    const result = employeeSchema.validate(data);
    return result;
}

export default validateEmployee;