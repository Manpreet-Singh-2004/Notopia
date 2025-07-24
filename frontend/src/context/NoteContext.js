import { Children, createContext, useReducer } from "react";

export const NoteContext = createContext()

export const noteReducer = (state, action)=>{
    switch(action.type){
        case 'SET_NOTE':
            return{
                note: action.payload
            }
        case 'CREATE_NOTE':
            return{
                note: [action.payload, ...state.note]
            }
        case 'DELETE_NOTE':
            return{
                note: state.note.filter((n)=>n._id !== action.payload._id)
            }
        default:
            return state
    }
}

export const NoteContextProvider = ({children}) =>{
    const [state, dispatch] = useReducer(noteReducer, {
        note: []
    })

    return(
        <NoteContext.Provider value={{...state, dispatch}}>
            {children}
        </NoteContext.Provider>
    )
}