const path = require('path');
const fs = require('fs/promises');
const { User } = require('../../models')

const avatarsDir = path.join(__dirname, '../../', 'public/avatars');


const updateAvatars = async(req, res, next) => {
    const { _id } = req.user;
    const { path: tempUpload, originalname } = req.file;

    const fileName = `${_id}_${originalname}`;
    const resoltUpload = path.join(avatarsDir, fileName);
    const avatarURL = path.join('avatars', fileName);

    await fs.rename(tempUpload, resoltUpload);

    await User.findByIdAndUpdate(_id, {avatarURL});

    res.json({
        avatarURL
    });
}
module.exports = updateAvatars;