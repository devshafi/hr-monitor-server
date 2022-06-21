import Joi from "Joi";

const emailSchema = Joi.object().keys({
    subject: Joi.string().max(60).required(),
    body: Joi.string().required()
})

const emailDataSchema = Joi.object().keys({
    email:emailSchema,
    to: Joi.array().min(1).items(Joi.string().email())
})

const validateEmailData = (data) => {
    const result = emailDataSchema.validate(data);
    return result;
}

export default validateEmailData;