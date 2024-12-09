/**
 * 
 * @param { Request } request 
 * @param { Response } response 
 * @param { * } next 
 */
const requestLogger = (request, response, next) => {
  console.log('Method: ', request.method)
  console.log('Path: ', request.path)
  console.log('Body: ', request.body)
  console.log('---')
  next()
}

/**
 * 
 * @param { Request } request 
 * @param { Response } response 
 */
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint'})
}

module.exports = { requestLogger, unknownEndpoint }