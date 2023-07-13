const jimp = require("jimp");
const path = require('path');
const fs = require('fs/promises');
const { User } = require('../../models');
const { HttpError } = require('../../helpers');

const avatarsDir = path.join(__dirname, '../../', 'public/avatars');


const updateAvatars = async(req, res, next) => {
    
    if(!req.file) {
        throw HttpError({ status: 401 });
    }

    const { _id } = req.user;
    const { path: tempUpload, originalname } = req.file;

    const fileName = `${_id}_${originalname}`;
    const resoltUpload = path.join(avatarsDir, fileName);
    const avatarURL = path.join('avatars', fileName);

    const image = await jimp.read(tempUpload);
    const newImage = await image.cover(250, 250);
    newImage.write(tempUpload);

    await fs.rename(tempUpload, resoltUpload);

    await User.findByIdAndUpdate(_id, {avatarURL});

    res.json({ avatarURL });
}
module.exports = updateAvatars;