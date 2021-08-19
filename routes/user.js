const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

router.get('/', userController.getAll)

router.get('/:id', userController.getById)

router.post('/', userController.create)

router.put('/:id', userController.replace)

router.patch('/:id', userController.update)

router.get('/:id/decks', userController.getUserDecks)

router.post('/:id/decks', userController.createUserDecks)

module.exports = router