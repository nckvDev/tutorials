import './App.css'

function App() {
  const addNote = async (event) => {
    event.preventDefault()
    const content = event.target.name.value
    event.target.name.value = ''
    console.log(content)
  }

  const toggleImportance = (note) => {
    console.log('toggle importance of', note.id)
  }

  const notes = []

  return (
    <div>
      <h2>Notes app</h2>
      <form onSubmit={addNote}>
        <input name='note' />
        <button type='submit'>add</button>
      </form>
      {
        notes.map(note => 
          <li key={note.id} onClick={() => toggleImportance(note)}>
            {note.content}
            <strong>{note.important ? 'important' : ''}</strong>
          </li>
        )
      }
    </div>
  )
}

export default App
