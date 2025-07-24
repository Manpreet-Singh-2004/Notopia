import { useAuthContext } from "./useAuthContext";
import {useNoteContext} from "./useNoteContext"

export const useLogout = () =>{
    const {dispatch} = useAuthContext()
    const {dispatch: NoteDispatch} = useNoteContext()

    const logout = () =>{
        localStorage.removeItem('user')

        dispatch({type: 'LOGOUT'})
        NoteDispatch({type: 'SET_NOTE', payload: null})
    }
    return {logout}
}