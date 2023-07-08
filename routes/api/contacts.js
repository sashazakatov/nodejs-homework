const express = require('express')
const { contacts } = require('../../controllers');
const { authorization } = require('../../middlewares')


const router = express.Router()

router.get('/', authorization, contacts.getAll)

router.get('/:contactId',  authorization, contacts.getById);

router.post('/', authorization, contacts.add);

router.delete('/:contactId', authorization, contacts.deleteById);

router.put('/:contactId', authorization, contacts.updateById);

router.patch('/:contactId/favorite', authorization, contacts.updateStatusContact);

module.exports = router;