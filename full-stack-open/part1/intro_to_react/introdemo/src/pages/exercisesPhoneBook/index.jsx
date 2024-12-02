import { useEffect, useMemo, useState } from "react"
import Filter from "../../components/Filter"
import PersonForm from "../../components/PersonForm"
import Persons from "../../components/Persons"
import phoneBookService from "../../services/phoneBook"

const ExercisesPhoneBook = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [search, setSearch] = useState('')


  useEffect(() => {
    phoneBookService.getAll().then((initialPhone) => {
      setPersons(initialPhone)
    })
  }, [])

  /**
   * 
   * @param {HTMLElement} event  Event handle submit form.
   * @returns
   */
  const addPersons = (event) => {
    console.log('newName', newName);
    event.preventDefault()
    const nameIsAlready = persons.findIndex((person) => person.name === newName) !== -1

    if (nameIsAlready) {
      const confirmReplaceNumber = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      if(!confirmReplaceNumber) {
        return;
      }
      const findPerson = persons.find((person) => person.name === newName)
      const updatePersons = {
        name: newName,
        number: phoneNumber
      }
      phoneBookService.update(findPerson.id, updatePersons).then((response) => {
        setPersons(persons.map((person) => person.id === findPerson.id ? response : person))
        setNewName('')
        setPhoneNumber('')
      })
    } else {
      const newPersons = {
        name: newName,
        number: phoneNumber
      }
  
      phoneBookService.create(newPersons).then(response => {
        setPersons(persons.concat(response))
        setNewName('')
        setPhoneNumber('')
      })
    }
  }

  /**
   * 
   * @param { HTMLElement } event 
   */
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  /**
   * 
   * @param { HTMLElement } event 
   */
  const handlePhoneChange = (event) => {
    setPhoneNumber(event.target.value)
  }

  /**
   * 
   * @param { HTMLElement } event 
   */
  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  const filteredPersons = useMemo(() => {
    const searchTerm = search.trim().toLowerCase();
    if (!searchTerm) return persons;
    
    return persons.filter(person =>
      person.name.toLowerCase().includes(searchTerm)
    );
  }, [persons, search]);

  const handleDelete = (value) => {
    const confirmDelete = window.confirm(`Delete ${value.name} ?`)
    if (confirmDelete) {
      phoneBookService.deletePhone(value.id).then((response) => {
        setPersons(persons.filter(person => person.id !== response.id))
      })
    }
  }

  return (
    <div>
      <h2>Phone Book</h2>
      <Filter text="filter shown with" search={search} handleSearch={handleSearch} />
      <h2>Add a new</h2>
      <PersonForm 
        onSubmit={addPersons} 
        newName={newName} 
        handleNameChange={handleNameChange} 
        phoneNumber={phoneNumber} 
        handlePhoneChange={handlePhoneChange}
      />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} handleDelete={handleDelete} />
    </div>
  )
}

export default ExercisesPhoneBook