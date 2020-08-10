if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
  }
  
  const password = process.argv[2]
  const name = process.argv[3]
  const number = process.argv[4]
  const id = process.argv[5]
  var mongoose = require('mongoose')
  const url =
    ``
  
  mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  
  const personSchema = new mongoose.Schema({
    number: String,
    name: String,
    id: String,
  })
  
  const Person = mongoose.model('Person', personSchema)
  
  const person = new Person({
    number: number,
    name: name,
    id: number,
  })
  
  person.save().then(result => {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })
  if (process.argv.length == 3) {
    Person
    .find({})
    .then(result=> {
      result.forEach(person => {
          console.log(person)
      })
      mongoose.connection.close()
    })
  }
