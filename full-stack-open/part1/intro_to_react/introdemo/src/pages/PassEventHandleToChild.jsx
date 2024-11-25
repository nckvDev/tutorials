import { useState } from "react"

const History = (props) => {
  if (props.allClicks.length === 0) {
    return (
      <div>
        the app is used by pressing the button
      </div>
    )
  }

  return (
    <div>
      button press history: {props.allClicks.join(' ')}
    </div>
  )
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const PassEventHandleToChild = () => {
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])

  const handleLeftClick = (value) => {
    setAll(allClicks.concat('L'))
    setLeft(left + value)
  }

  const handleRightClick = (value) => {
    setAll(allClicks.concat('R'))
    setRight(right + value)
  }

  return (
    <div>
      {left}
      <Button handleClick={() => handleLeftClick(1)} text='left' />
      <Button handleClick={() => handleRightClick(1)} text='right' />
      {right}
      <History allClicks={allClicks} />
    </div>
  )
}

export default PassEventHandleToChild
