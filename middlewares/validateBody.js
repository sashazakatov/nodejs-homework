const { HttpError } = require('../helpers');

const validateBody = schema => {
    const func = (req, res, next) => {
        const { error } = schema.validate(req.body);

        if(error){
            next(HttpError({ status: 400, message: "Bad Request" }));
        }
        next();
    }
    return func;
}

module.exports = validateBody;