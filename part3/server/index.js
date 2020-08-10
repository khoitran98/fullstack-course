console.log('server starting')
const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())
var morgan = require('morgan')
let persons = [
  {
    "name": "Arto Hellas",
    "number": "040-123456",
    "id": 1
  },
  {
    "name": "Ada Lovelace",
    "number": "39-44-5323523",
    "id": 2
  },
  {
    "name": "Dan Abramov",
    "number": "12-43-234345",
    "id": 3
  },
  {
    "name": "Mary Poppendieck",
    "number": "39-23-6423122",
    "id": 4
  },
  {
    "name": "dm",
    "number": "123",
    "id": 5
  }
]
app.use(morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    JSON.stringify({ name: req.query.name, number: req.query.number }),
  ].join(' ')
}))
app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})
app.get('/info', (req, res) => {
  res.send(`Phonebook has info for ${persons.length} people. <br/>${Date()}`)
})
app.get('/api/persons', (req, res) => {
  res.json(persons)
})
app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(note => note.id === id)
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})
app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(note => note.id !== id)
  response.status(204).end()
})
app.post('/api/persons/', (req, res) => {
  const id = Math.floor(Math.random() * Math.floor(100))
  const person = {
    "id": id,
    "name": req.query.name,
    "number": req.query.number
  }
  if (persons.find(p => p.name === person.name))
  {
    res.send('name must be unique')
    return
  }
  if (person.name == '' || person.number == '')
  {
    res.send('name or number is missing') 
    return
  }
  persons = persons.concat(person)
  res.json(persons)
})
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})