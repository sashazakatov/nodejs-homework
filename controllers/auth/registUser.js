const bcrypt = require('bcrypt');
const { User } = require('../../models')
const { HttpError } = require('../../helpers');

const { usersSchemes } = require('../../schemes');

const registUser = async (req, res, next) => {
    const { error, value } = usersSchemes.registerScheme.validate(req.body);
    if(error){
        throw HttpError({ status: 400,  message: "Bad Request"});
    }

    const existingUser = await User.findOne({ email: value.email });
    if (existingUser) {
      throw HttpError({ status: 409, message: "Conflict" });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(value.password, salt);
    value.password = hashPassword;

    const { email, subscription } = await User.create(value);
    res.json({ user: {
      email,
      subscription,
    }});
}

module.exports = registUser;