const { isValidObjectId } = require('mongoose');
const { HttpError } = require('../helpers');

const isValidId = (req, res, next) => {
    const { id } = req.params;
    if(!isValidObjectId){
        next( HttpError({ 
            status: 400, 
            message: `${id} is not valid id` 
        }));
    }
    next();
}

module.exports = isValidId;