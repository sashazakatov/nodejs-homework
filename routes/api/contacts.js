const express = require('express')
const { contacts } = require('../../controllers');

const router = express.Router()

router.get('/', contacts.getAll)

router.get('/:contactId', contacts.getById);

router.post('/', contacts.addById);

router.delete('/:contactId', contacts.deleteById);

router.put('/:contactId', contacts.updateById);

router.patch('/:contactId/favorite', contacts.updateStatusContact);

module.exports = router;