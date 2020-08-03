import React, { useState } from 'react'
import Note from './Note'
const Filter = (props) => {
    // ...
    return(
        <form onSubmit = {props.addFilter}>
            <div>
                filter shown with: <input value = {props.filt} onChange = {props.handleFilt} />
            </div>
        </form>
    )
}
const PersonForm = (props) => {
    // ...
    return(
        <form onSubmit ={props.addName}>
            <div>
                name: <input value={props.newName} onChange={props.handleChange} />
            </div>
            <div>
                number: <input value={props.newNumber} onChange={props.handleNumChange} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}
const Persons = (props) => {
    // ...
    return(
        <ul>
            {props.namesToShow.map((person, i) => 
            <Note key={i} note={person} />
            )}
        </ul>
    )
}
const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '123' }
  ]) 
  const [filt,setFilt] = useState('')
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNum ] = useState('')
  const [showAll, setShowAll] = useState(true)
  const addName = (event) => {
    event.preventDefault()
    const person = {
        name: newName,
        number: newNumber,
    }
    if (persons.find(element => element.name === newName) != null)
    {
        alert(`${newName} is already added to phonebook`)
        return
    }
    setPersons(persons.concat(person))
    setNewName('')
    setNewNum('')
  }
  const addFilter = (event) => {
    event.preventDefault()
    setShowAll(false)
  }
  const handleChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNumChange = (event) => {
    console.log(event.target.value)
    setNewNum(event.target.value)
  }
  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilt(event.target.value)
  }

  const namesToShow = showAll
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(filt.toLowerCase()))

  return (
    <div>
        <h2>Phonebook</h2>
        <Filter handleFilt = {handleFilterChange} filt = {filt} addFilter = {addFilter}/>
        <h3>Add a new</h3>
        <PersonForm addName = {addName} newName = {newName} handleChange={handleChange} newNumber= {newNumber} handleNumChange = {handleNumChange}/>
        <h3>Numbers</h3>
        <Persons namesToShow = {namesToShow}/>
    </div>
  )
}

export default App