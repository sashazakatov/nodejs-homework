const express = require('express')
const Joi = require('joi');

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
      const err = new Error("Not found");
      err.status = 400;
      throw err;
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
      const err = new Error("missing required name field");
      err.status = 400;
      throw err;
    }
    console.log(error);
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
      const err = new Error("Not found");
      err.status = 404;
      throw err;
    }
    res.json({ message: "contact deleted" })
  }
  catch(err){
    next(err);
  }
})

router.put('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  try{
    if(!req.body){
      const err = new Error("missing fields");
      err.status = 400;
      throw err;
    }
    const updatedContact = await updateContact(contactId, req.body);
    if(!updatedContact){
      const err = new Error("Not found");
      err.status = 404;
      throw err;
    }
    res.json(updatedContact);
  }
  catch(err){
    next(err);
  }
})

module.exports = router