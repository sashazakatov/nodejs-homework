const decorator = (controller) => {
    const func = async (req, res, next) => {
        try{
            await controller();
        }
        catch(error){
            next(error)
        }
    }
    return func;
}
module.exports = {
    decorator
};