import { BadRequest } from "../utils/errors.js";

const handleValidation = (validate, property) => {
    return (req, res, next) => {
        const result = validate(req[property]);
        // console.log(req.body)
        const isValid = result.error == null;
        if (isValid) {
            return next();
        }
        const { details } = result.error;
        const messages = details.map(e => e.message);
        const msg = messages.join(",");
        throw new BadRequest(msg);
    }
}

export default handleValidation;