
const Persons = (props) => {
  const { persons, handleDelete } = props
  return (
    <>
      {
        persons.map((value, index) => (
          <div key={value.name + index}>
            {value.name} {value.number} <button onClick={() => handleDelete(value)}>delete</button>
          </div>
        ))
      }  
    </>
  )
}

export default Persons