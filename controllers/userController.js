const User = require('../models/User')
const Deck = require('../models/Deck')

const getAll = async (req, res, next) => {
  try {
    const userList = await User.find().populate('decks')
    res.status(200).json(userList)
  }
  catch (err) {
    res.status(401).json({message: err.message})
  }
}

const getById = async (req, res, next) => {
  const { id } = req.params
  const user = await User.findById(id).populate('decks')
  if(user === null) {
    res.status(400).json({message : 'Cannot find User'})
  }
  res.status(200).json(user)
}

const create = async (req, res, next) => {
  const user = new User(req.body)

  try {
    const newUser = await user.save()
    res.status(200).json(newUser)
  }
  catch (err) {
    res.status(400).json({message: err.message})
  }
}

const replace = async (req, res, next) => {
  const { id } = req.params
  
  const newUser = req.body

  try {
    const result = await User.findByIdAndUpdate(id, newUser)
    res.status(201).json(newUser) 
  }
  catch (err) {
    res.status(400).json({message: err.message})
  }
}

const update = async (req, res, next) => {
  const { id } = req.params
  
  const newUser = req.body

  try {
    const result = await User.findByIdAndUpdate(id, newUser)
    res.status(201).json(newUser) 
  }
  catch (err) {
    res.status(400).json({message: err.message})
  }
}

const getUserDecks = async (req, res, next) => {
  const { id } = req.params

  const user = await User.findById(id).populate('decks')

  res.status(200).json(user.decks)
}

const createUserDecks = async (req, res, next) => {
  const { id } = req.params

  const newDeck = new Deck(req.body)

  const user = await User.findById(id)

  newDeck.owner = user

  await newDeck.save()

  user.decks.push(newDeck._id)

  await user.save()

  res.status(201).json(newDeck)
}

module.exports = {getAll, getById, create, replace, update, getUserDecks, createUserDecks}