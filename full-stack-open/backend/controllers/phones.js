const phonesRouter = require('express').Router()
const Phone = require('../models/phone')

phonesRouter.get('/', (request, response) => {
  Phone.find({}).then(phones => {
    response.json(phones)
  })
})

phonesRouter.get('/:id', (request, response, next) => {
  Phone.findById(request.params.id)
    .then(phone => {
      if (phone) {
        response.json(phone)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

phonesRouter.post('/', (request, response, next) => {
  const body = request.body

  const phone = new Phone({
    name: body.name,
    number: body.number,
  })

  phone.save()
    .then(savedPhone => {
      response.json(savedPhone)
    })
    .catch(error => next(error))
})

phonesRouter.delete('/:id', (request, response, next) => {
  Phone.findByIdAndDelete(request.params.id)
    .then((resp) => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

phonesRouter.put('/:id', (request, response, next) => {
  const body = request.body

  const phone = {
    name: body.name,
    number: body.number,
  }

  Phone.findByIdAndUpdate(request.params.id, phone, { new: true })
    .then(updatedPhone => {
      response.json(updatedPhone)
    })
    .catch(error => next(error))
})

module.exports = phonesRouter