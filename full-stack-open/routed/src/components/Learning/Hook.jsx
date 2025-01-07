import { useState } from "react"

// eslint-disable-next-line no-unused-vars
const useCounter = () => {
  const [value, setValue] = useState(0)

  const increase = () => {
    setValue(value + 1)
  }

  const decrease = () => {
    setValue(value - 1)
  }

  const zero = () => {
    setValue(0)
  }

  return {
    value, 
    increase,
    decrease,
    zero
  }
}

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const Hook = () => {
  // const [counter, setCounter] = useState(0)
  // const {value, increase, decrease, zero} = useCounter()
  // const left = useCounter()
  // const right = useCounter()

  // const [name, setName] = useState('')
  // const [born, setBorn] = useState('')
  // const [height, setHeight] = useState('')
  const name = useField('text')
  const born = useField('date')
  const height = useField('number')

  return (
    <div>
      {/* <div>{value}</div>
      <button onClick={increase}>
        plus
      </button>
      <button onClick={decrease}>
        minus
      </button>      
      <button onClick={zero}>
        zero
      </button> */}

      {/* {left.value}
      <button onClick={left.increase}>
        left
      </button>
      <button onClick={right.increase}>
        right
      </button>
      {right.value} */}

      <div>
        <form>
          name: 
          <input {...name} /> 
          <br/> 
          birthdate:
          <input {...born}/>
          <br /> 
          height:
          <input
            type={height.type}
            value={height.value}
            onChange={height.onChange}
          />
        </form>
        <div>
          {name.value} {born.value} {height.value} 
        </div>
      </div>
    </div>
  )
}

export default Hook
