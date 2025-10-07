import { useNoteContext } from "../hooks/useNoteContext"
import { useState } from "react"
import { useAuthContext } from "../hooks/useAuthContext"

const NoteForm = ()=>{
    const { dispatch } = useNoteContext()
    const {user} = useAuthContext()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [pinned, setPinned] = useState(false)
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(!user){
            setError('you must be Logged in')
            return
        }

        const workout = {title, description, pinned}

        const response = await fetch('/notes', {
            method: 'POST',
            body: JSON.stringify(workout),
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if(!response.ok){
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if(response.ok){
            setTitle('')
            setDescription('')
            setPinned(false)
            setError(null)
            setEmptyFields([])
            console.log('New workout added', json)
            dispatch({type: 'CREATE_WORKOUT', payload: json})
        }
    }

    return(
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a new Note</h3>

            <label>Note Title</label>
            <input
            type ="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            className={emptyFields.includes('title') ? 'error' : ''}
            />

            <label>Description:</label>
            <input
            type ="text"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            className={emptyFields.includes('description') ? 'error' : ''}
            />

<label>Pinned:</label>
<div className="radio-group">
  <div className="radio-option">
    <input 
      type="radio" 
      id="pinned-yes" 
      name="pinned" 
      value="yes"
      // ... other props like onChange, checked
    />
    <label htmlFor="pinned-yes">Yes</label>
  </div>

  <div className="radio-option">
    <input 
      type="radio" 
      id="pinned-no" 
      name="pinned" 
      value="no"
      // ... other props like onChange, checked
    />
    <label htmlFor="pinned-no">No</label>
  </div>
</div>

        
        <button>Add Note</button>
        {error && <div className="error">{error}</div>}
        </form>
    )
}

export default NoteForm