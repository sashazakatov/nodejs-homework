const express = require('express')
const Joi = require('joi');

const { HttpError } = require('../../helpers');

const {
  getListContact,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require('../../models/contacts.js')


const router = express.Router()

const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
})

router.get('/', async (req, res, next) => {
  const contacts = await getListContact();
  res.json(contacts);
})

router.get('/:contactId', async (req, res, next) => {
  try{
    const { contactId } = req.params;
    const contactById = await getContactById(contactId);
    if(!contactById){
      throw HttpError({status: 400, message:"Not found"});
    }
    res.json(contactById);
  }
  catch (err){
    next(err);
  }
})

router.post('/', async (req, res, next) => {
  try{
    const { value, error } = schema.validate(req.body);
    if(error){
      throw HttpError({status: 400, message:"missing required name field"});
    }
    const addedContact = await addContact(value);
    res.json(addedContact);
  }
  catch(err){
    next(err);
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try{
    const { contactId } = req.params;
    const remoingContact = await removeContact(contactId);
    if(!remoingContact){
      throw HttpError({status: 404, message:"Not found"});
    }
    res.json({ message: "contact deleted" })
  }
  catch(err){
    next(err);
  }
})

router.put('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  const { value, error } = schema.validate(req.body);
  try{
    if(error){
      throw HttpError({status: 400, message:"missing fields"});
    }
    const updatedContact = await updateContact(contactId, value);
    if(!updatedContact){
      throw HttpError({status: 404, message:"Not found"});
    }
    res.json(updatedContact);
  }
  catch(err){
    next(err);
  }
})
module.exports = router