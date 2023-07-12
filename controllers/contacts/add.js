const { Contact }  = require('../../models');

const add = async (req, res, next) => {
    const resolt = await Contact.create({ ...req.body, owner: req.user._id });
    res.json(resolt); 
}

module.exports = add;