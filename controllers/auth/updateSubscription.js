const { User } = require('../../models');

const updateSubscription = async(req, res, next) => {
    const { id } =  req.user;

    const resolt = await User.findByIdAndUpdate( id, req.body, { new: true } );

    console.log(resolt);

    if(!resolt){
      throw HttpError({status: 404, message:"Not found"});
    }
    
    res.json(resolt);
}
module.exports = updateSubscription;