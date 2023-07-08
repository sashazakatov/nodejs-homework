const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { HttpError } = require('../helpers');

const { SECRET_WORD  } = process.env

const authorization =  async (req, res, next) => {
    const { authorization } = req.headers;

    const [bearer, token] = authorization.split(' ');

    if(!bearer || !token){
        throw HttpError({ status: 401,  message: "Not authorized" });
    }
    
    try{
        const { id } = jwt.verify(token, SECRET_WORD);
        const user = await User.findById(id);
        
        if(!user) {
            throw new Error();
        }

        req.user = user;
        next();
    }
    catch (error){
        error.message = "Not authorized";
        error.status = 401;
        next(error);
    }
}

module.exports = authorization; 