import React, { useState, useEffect } from 'react'
import Note from './Note'
import serv from '../services/services'
import '../index.css';
const Notification = ({ message }) => {
    if (message === null)
        return null
    else if (message.includes("added"))
    {
        return (
            <div className="success">
              {message}
            </div>
        )
    }
    else if (message.includes("removed"))
    {
        return (
        <div className="error">
            {message}
        </div>
        )
    }
  }
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
const App = () => {
    const [ persons, setPersons] = useState([
        {}
    ]) 
    const [message, setMessage ] = useState(null)
    useEffect(() => {
        serv
            .getAll()
            .then(response => {
            console.log('promise fulfilled')
            setPersons(response.data)
            })
    }, [])
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
            let id = persons.find(element => element.name === newName).id
            if (window.confirm(`${newName} is already added to phonebook, replace the old number with the new one?`))
            {
                serv.update(id,person)
                .then(response => {
                console.log(response)
                serv
                .getAll()
                .then(response => {
                console.log('promise fulfilled')
                setPersons(response.data)
                })
                }).catch(error => {
                setMessage(
                    `'${person.name}' was already removed from server`
                )
                setTimeout(() => {
                    setMessage(null)
                }, 5000)
                //setPersons(persons.filter(n => n.id !== id))
                })
            }
            return
        }
        // setPersons(persons.concat(person))
        setNewName('')
        setNewNum('')
        serv.create(person)
        .then(response => {
        console.log(response)
        serv
        .getAll()
        .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
        setMessage(
            `'${person.name}' added`
        )
        setTimeout(() => {
            setMessage(null)
        }, 5000)
        })
        return
        }).catch(error => {
            // this is the way to access the error message
            console.log('error')
            console.log(error.response.data)
        })
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
    const handleDelete = (name) => {
        if (!window.confirm("Delete this person?"))
            return
        serv.del(name)
        .then(response => {
        console.log(response)
        serv
            .getAll()
            .then(response => {
            console.log('promise fulfilled')
            setPersons(response.data)
            })
        })     
    }

    const namesToShow = showAll
        ? persons
        : persons.filter(person => person.name.toLowerCase().includes(filt.toLowerCase()))

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={message} />
            <Filter handleFilt = {handleFilterChange} filt = {filt} addFilter = {addFilter}/>
            <h3>Add a new</h3>
            <PersonForm addName = {addName} newName = {newName} handleChange={handleChange} newNumber= {newNumber} handleNumChange = {handleNumChange}/>
            <h3>Numbers</h3>
            <ul>
                {namesToShow.map((person, i) => 
                <div>
                <Note key={i} note={person}/>
                <button onClick={() => handleDelete(person.name)}> delete </button>
                </div>
                )}
            </ul>
        </div>
    )
}

export default App