import { useDispatch } from "react-redux"
import { filterChange } from "../reducers/filterReducer"

const VisibilityFilter = (props) => {
  const dispatch = useDispatch()

  return (
    <div>
      all
      <input
        type="radio"
        name="filter"
        onChange={() => dispatch(filterChange('ALL'))}
      />
      important
      <input
        type="radio"
        name="filter"
        onChange={() => dispatch(filterChange('IMPORTANT'))}
      />
      non important
      <input
        type="radio"
        name="filter"
        onChange={() => dispatch(filterChange('NON-IMPORTANT'))}
      />
    </div>
  )
}

export default VisibilityFilter