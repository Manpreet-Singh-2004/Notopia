import { useNoteContext } from "../hooks/useNoteContext"
import { useAuthContext } from "../hooks/useAuthContext"
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const NoteDetails = ({ note }) => {
  const { dispatch } = useNoteContext()
  const { user } = useAuthContext()

  if (!note) return null

  const handleClick = async () => {
    if (!user) return

    const response = await fetch('/notes/' + note._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })

    const json = await response.json()

    if (response.ok) {
      dispatch({ type: 'DELETE_NOTE', payload: json })
    }
  }

  return (
    <div className="note-details">
      <h4>{note.title}</h4>
      <p><strong>Description: </strong>{note.description}</p>
      <p><strong>Pinned: </strong>{note.pinned ? 'Yes' : 'No'}</p>
      <p>{formatDistanceToNow(new Date(note.createdAt), { addSuffix: true })}</p>
      <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
    </div>
  )
}

export default NoteDetails
