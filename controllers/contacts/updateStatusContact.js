const { Contact } = require('../../models');
const { HttpError } = require('../../helpers');

const updateStatusContact = async(req, res, next) => {
    const { contactId } = req.params;

    const resolt = await Contact.findByIdAndUpdate(contactId, req.body, { new: true });
    if(!resolt){
      throw HttpError({status: 404, message:"Not found"});
    }
    res.json(resolt);
}

module.exports = updateStatusContact;