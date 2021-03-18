import { configureStore } from '@reduxjs/toolkit'
enum Relation{
        Manager,
        RSVP,
        NotRSVP
}


// ACTIOn
const redux_index = (new_index:number) =>{ return { type: 'INDEX', payload:new_index } }
const redux_rsvp = (rsvp_state:number) =>{ return { type: 'RSVP', payload:rsvp_state } }

// REDUCER
const change_index = (state={index:0, relation:Relation.Manager}, action:any) =>{
        switch(action.type){
                case "INDEX":
                        return {...state, index:action.payload}
                case "RSVP":
                        return {...state, relation:action.payload}

                default:
                        return {...state, index:state.index, relation:state.relation}
        }

}
// REDUX END
const store = configureStore(
        { reducer: {state: change_index }}
); 




export { store, redux_index, redux_rsvp};
