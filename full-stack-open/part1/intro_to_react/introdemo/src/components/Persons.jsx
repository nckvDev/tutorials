
const Persons = (props) => {
  const { persons } = props
  return (
    <>
      {
        persons.map((value, index) => (
          <div key={value.name + index}>{value.name} {value.number}</div>
        ))
      }  
    </>
  )
}

export default Persons