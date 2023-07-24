const bcrypt = require('bcrypt');
const gravatar = require('gravatar');
const shortid = require('shortid');
const { User } = require('../../models')
const { HttpError, sendEmail } = require('../../helpers');

const { BASE_URL } = process.env;

const registUser = async (req, res, next) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (user) {
      throw HttpError({ status: 409, message: "Conflict" });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);

    const avatarURL = gravatar.url(email);
    const verificationCode = shortid.generate()

    const newUser = await User.create({...req.body, password:hashPassword, avatarURL, verificationCode});

    await sendEmail({
      to: email,
      subject: 'Verify email',
      html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${verificationCode}">Click verify email</a>`,
    });

    res.json({ user: {
      email: newUser.email,
      subscription: newUser.subscription,
    }});
}

module.exports = registUser;