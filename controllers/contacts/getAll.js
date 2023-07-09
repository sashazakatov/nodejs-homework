const { Contact } = require('../../models');

const getAll = async (req, res, next) => {
    const page = parseInt(req.query?.page) || 1;
    const limit = parseInt(req.query?.limit) || 10;
    const { favorite } = req.query;

    const startIndex = (page - 1) * limit; 
    const endIndex = page * limit;

    const query = { owner: req.user._id };
    
    if(favorite){
        query.favorite = favorite
    }

    const result = await Contact.find( query )
        .skip(startIndex)
        .limit(endIndex);
    res.json(result);
}
module.exports = getAll;