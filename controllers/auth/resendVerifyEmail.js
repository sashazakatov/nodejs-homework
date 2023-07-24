const { User } = require('../../models');
const { HttpError, sendEmail } = require('../../helpers'); 

const { BASE_URL } = process.env;

const resendVerifyEmail = async(req, res) => {
    const {email} = req.body;

    const user = await User.findOne({ email });

    if(!user){
        throw HttpError({status: 400, message: "missing required field email"});
    }
    if(user.verify){
        throw HttpError({ status: 400, message: "Verification has already been passed"});
    }

    await sendEmail({
        to: email,
        subject: 'Verify email',
        html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${verificationCode}">Click verify email</a>`,
    });
  

    res.json({
        message: 'Verify email send success',
    })
}
module.exports = resendVerifyEmail;