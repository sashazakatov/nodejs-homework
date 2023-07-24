const { User } = require('../../models');
const { HttpError } = require('../../helpers');

const verifyEmail = async (req, res, next) => {
    const { verificationToken: verificationCode } = req.params;

    const user = await User.findOne({ verificationCode });
    console.log('aaa');


    if (!user) {
        console.log('fff');
        throw HttpError({status: 404, message: 'User not found'});
    }

    await User.findByIdAndUpdate(user._id, {verify: true, verificationCode: null})

    res.json({
        message: 'Verification successful',
    });
};

module.exports = verifyEmail;