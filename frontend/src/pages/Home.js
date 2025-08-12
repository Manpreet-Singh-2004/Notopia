import { useEffect } from "react"
import { useNoteContext } from "../hooks/useNoteContext"
import {useAuthContext} from "../hooks/useAuthContext"

// Components
import NoteDetails from '../components/NoteDetails'
import NoteForm from '../components/NoteForm'

const Home = () =>{

    const {note, dispatch} = useNoteContext()
    const {user} = useAuthContext()

    useEffect(() => {
        const fetchnote = async() =>{
            const response = await fetch('/notes', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if (response.ok){
                dispatch({type: 'SET_NOTE', payload: json})
            }
        }
        if(user){
            fetchnote()
        }

    }, [dispatch, user])
    
    if (note === null) {
        return <div>Loading notes...</div>
    }

    return(
        <div className="home">
            <div className="note">
  {note && [...note]
    .sort((a, b) => (b.pinned === true) - (a.pinned === true))
    .map(note => (
      <div key={note._id}>
        <NoteDetails note={note} />
        <hr />
      </div>
    ))
  }
</div>
                <NoteForm/>
        </div>
    )
}

export default Home