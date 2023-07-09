const express = require('express')
const { contacts } = require('../../controllers');
const { authorization, validateBody, isValidId } = require('../../middlewares')
const { contactSchemes } = require('../../schemes');


const router = express.Router()

router.get('/', authorization, contacts.getAll)

router.get('/:contactId', isValidId, authorization, contacts.getById);

router.post('/', validateBody(contactSchemes.contactsScheme), authorization, contacts.add);

router.delete('/:contactId', isValidId, authorization, contacts.deleteById);

router.put('/:contactId', isValidId, validateBody(contactSchemes.contactsScheme), authorization, contacts.updateById);

router.patch('/:contactId/favorite', isValidId, validateBody(contactSchemes.favoriteScheme), authorization, contacts.updateStatusContact);

module.exports = router;