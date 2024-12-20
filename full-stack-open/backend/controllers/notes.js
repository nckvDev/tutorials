const notesRouter = require('express').Router()
const Note = require('../models/note')

notesRouter.get('/', async (request, response, next) => {
  try {
    const notes = await Note.find({})
    response.json(notes)
  } catch(exception) {
    next(exception)
  }
})

notesRouter.get('/:id', async (request, response, next) => {
  try {
    const notes = await Note.findById(request.params.id)
    if (notes) {
      response.json(notes)
    } else {
      response.status(404).end()
    }
  } catch(exception) {
    next(exception)
  }
})

notesRouter.post('/', async (request, response, next) => {
  const body = request.body

  const note = new Note({
    content: body.content,
    important: body.important || false,
  })

  try {
    const saveNote = await note.save()
    response.status(201).json(saveNote)
  } catch(exception) {
    next(exception)
  }
})

notesRouter.delete('/:id', async (request, response, next) => {
  try {
    await Note.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } catch (exception) {
    next(exception)
  }
})

notesRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  const note = {
    content: body.content,
    important: body.important,
  }

  try {
    const updateNote = await Note.findByIdAndUpdate(request.params.id, note, { new: true })
    response.json(updateNote)
  } catch (exception) {
    next(exception)
  }
})

module.exports = notesRouter