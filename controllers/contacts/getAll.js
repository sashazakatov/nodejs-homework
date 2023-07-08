const { Contact } = require('../../models');

const getAll = async (req, res, next) => {
    // console.log(req.user._id);
    const result = await Contact.find({ owner: req.user._id });
    res.json(result);
}
module.exports = getAll;