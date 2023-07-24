const { User } = require('../../models');
const { HttpError } = require('../../helpers');

const verificationToken = async(req, res) => {
    const {verificationToken} = req.query;

    console.log(verificationToken);

    const user = await User.find({verificationCode: verificationToken});

    console.log(user);

    if(!user){
        HttpError({status: 404, message: 'User not found'});
    }

    // user
}

module.exports = verificationToken;