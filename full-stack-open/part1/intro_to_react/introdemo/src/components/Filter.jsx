
const Filter = (props) => {
  const { search, handleSearch } = props
  return (
    <div>
      filter shown with: <input value={search} onChange={handleSearch} />
    </div>
  )
}

export default Filter