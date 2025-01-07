import Button from "./Button"
import Display from "./Display"


const ContextState = () => {
  return (
    <div>
      <Display />
      <div>
        <Button type='INC' label='+' />
        <Button type='DEC' label='-' />
        <Button type='ZERO' label='0' />
      </div>
    </div>
  )
}

// Display.prototype = {
//   counter: PropType.string.isRequired
// }

export default ContextState