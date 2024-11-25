import { useMemo, useState } from "react"
import Filter from "../../components/Filter"
import PersonForm from "../../components/PersonForm"
import Persons from "../../components/Persons"

const ExercisesPhoneBook = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [search, setSearch] = useState('')

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
      window.alert(`${newName} is already added to phonebook`)
      return;
    }

    const newPersons = {
      name: newName,
      number: phoneNumber
    }
    setPersons(persons.concat(newPersons))
    setNewName('')
    setPhoneNumber('')
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
      <Persons persons={filteredPersons} />
    </div>
  )
}

export default ExercisesPhoneBook