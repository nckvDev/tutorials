import { useEffect, useState } from "react"
import Note from '../components/Note'
import noteService from "../services/notes"
import Notification from "../components/Notification"
import Footer from "../components/Footer"
import loginService from "../services/login"
import LoginForm from "../components/LoginForm"
import Toggled from "../components/Toggled"
import NoteForm from "../components/NoteForm"

const FormNote = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    noteService.getAll().then(initialNotes => {
      setNotes(initialNotes)
    })
  }, [])
  console.log('render', notes.length, 'notes')

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      // id: String(notes.length + 1)
    }

    noteService
    .create(noteObject)
    .then(returnedNote => {
      // console.log(response)
      setNotes(notes.concat(returnedNote))
      setNewNote('')
    })
    // setNotes(notes.concat(noteObject))
    // setNewNote('')
  }

  const handleNoteChange = (event) => {
    console.log(event.target.value);
    setNewNote(event.target.value)
  }

  const notesToShow = showAll ? notes : notes.filter(note => note.important)

  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService.update(id, changedNote).then(returnedNote => {
      setNotes(notes.map(n => n.id === id ? returnedNote : n))
    // eslint-disable-next-line no-unused-vars
    }).catch(error => {
      // alert(
      //   `the note '${note.content}' was already deleted from server`
      // )
      setErrorMessage(
        `Note '${note.content}' was already removed from server`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      setNotes(notes.filter(n => n.id !== id))
    })
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem(
        'loggedNoteAppUser', JSON.stringify(user)
      )
      noteService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.error(exception)
      setErrorMessage({ status: 'error', content: 'Wrong credentials'})
      setTimeout(() => {
        setErrorMessage('')
      }, 5000)
    }
  }

  const loginForm = () => {
    return (
      <div>
        <Toggled buttonLabel="login">
          <LoginForm 
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        </Toggled>
      </div>
    )
  }

  return (
    <div>
      <div>
        <h1>Notes</h1>
        <Notification message={errorMessage} />

        { user === null ? 
          loginForm() :
          <div>
            <p>{user?.name} logged-in</p>
            <Toggled buttonLabel="new note">
              <NoteForm
                value={newNote} 
                onSubmit={addNote} 
                handleChange={handleNoteChange} 
              />
            </Toggled>
          </div>
        }

        <h2>Notes</h2>
        
        <div>
          <button onClick={() => setShowAll(!showAll)}>
            show {showAll ? 'important' : 'all'}
          </button>
        </div>
        <ul>
          {notesToShow.map(note => 
            <Note 
              key={note.id} 
              note={note} 
              toggleImportance={() => toggleImportanceOf(note.id)} 
            />
          )}
        </ul>
      </div>
      <Footer />
    </div>
  )
}

export default FormNote
