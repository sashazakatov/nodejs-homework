const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('../../models');
const { HttpError } = require('../../helpers');

const { usersSchemes } = require('../../schemes');

const { SECRET_WORD } = process.env;

const login = async(req, res, next) => {
    const { error, value = '' } = usersSchemes.registerScheme.validate(req.body);
    if(error){
        throw HttpError({ status: 400, message: "Bad Request" });
    }

    const existingUser = await User.findOne({ email: value.email });
    const password = existingUser?.password ?? '';
    const match = await bcrypt.compare(value.password, password);

    if(!existingUser || !match){
        throw HttpError({ status: 401, message: "Email or password is wrong" })
    }

    const token = await jwt.sign({ id: existingUser.id }, SECRET_WORD, { expiresIn: '1d' });
    
    const user = await User.findByIdAndUpdate(existingUser.id, { token }, { new: true });

    res.json({
        token: user.token,
        user:{
            user: user.email,
            subscription: user.subscription,
        }
    })
}

module.exports = login;