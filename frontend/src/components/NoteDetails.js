import { useState } from 'react'
import { useNoteContext } from "../hooks/useNoteContext"
import { useAuthContext } from "../hooks/useAuthContext"
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const NoteDetails = ({ note }) => {
  const { dispatch } = useNoteContext()
  const { user } = useAuthContext()
  const [showDetails, setShowDetails] = useState(false)

  if (!note) return null

  const handleDelete = async () => {
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

  const togglePinned = async () => {
    if (!user) return

    // Toggle pinned status
    const response = await fetch('/notes/' + note._id, {
      method: 'PATCH',
      body: JSON.stringify({ pinned: !note.pinned }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })

    const json = await response.json()

    if (response.ok) {
      dispatch({ type: 'UPDATE_NOTE', payload: json })
    }
  }

  return (
    <div className="note-details">
      <h4
        style={{ cursor: 'pointer' }}
        onClick={() => setShowDetails(!showDetails)}
      >
        {note.title}
      </h4>

      {showDetails && (
        <>
          <p><strong>Description: </strong>{note.description}</p>
          <p>
            <strong>Pinned: </strong>
            <button
              onClick={togglePinned}
              style={{
                cursor: 'pointer',
                padding: '4px 8px',
                borderRadius: '6px',
                backgroundColor: note.pinned ? '#4a90e2' : '#ccc',
                color: 'white',
                border: 'none',
              }}
            >
              {note.pinned ? 'Unpin' : 'Pin'}
            </button>
          </p>
          <p>{formatDistanceToNow(new Date(note.createdAt), { addSuffix: true })}</p>
          <button
            className="delete-btn"
            onClick={handleDelete}
            style={{
              background: '#e74c3c',
              border: 'none',
              borderRadius: '6px',
              color: 'white',
              padding: '6px 10px',
              cursor: 'pointer',
              marginTop: '0.5rem',
            }}
          >
            🗑️ Delete
          </button>
        </>
      )}
    </div>
  )
}

export default NoteDetails
