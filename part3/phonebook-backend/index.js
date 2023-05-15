require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

const Person = require('./models/person')

app.use(express.json())
app.use(express.static('build'))
app.use(cors())

morgan.token('data', (request) => {
  return request.method === 'POST' ? JSON.stringify(request.body) : ''
})

app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :data')
)

app.get('/api/persons', (_request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons)
  })
})

app.get('/api/persons/:id', (request, response,next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch((error) => next(error))
})

app.get('/info', (request, response,next) => {
  Person.find({}).then(persons => {
    response.send(`<div> Phonebook has info for ${persons.length} people </div> <div>${new Date()} </div>`)
  }).catch(error => next(error))
})



app.put('/api/notes/:id', (request, response, next) => {
  const { name,number } = request.body

  Person.findByIdAndUpdate(request.params.id,{ name,number },{ new:true,runValidators:true,context:'query' }).then(updatedPerson => {
    response.json(updatedPerson)
  }).catch(error => next(error))
})





app.delete('/api/persons/:id', (request, response,next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch((error) => next(error))

})

app.post('/api/persons', (request, response,next) => {
  const { name,number } = request.body


  const person = new Person({
    name: name,
    number : number
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  }).catch(error => next(error))

})




const unknownEndpoint = (request, response) => {
  response.status(400).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  console.log(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformattd id' })
  }

  next(error)
}

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})