import { combineReducers } from 'redux'

function formId(state=0,action){
    switch (action.type) {
        case 'UPDATE_ID':
            return action.id
        default:
            return state
    }
}

function formData(state=[],action){
    switch (action.type) {
        case 'ADD_DATA':
            return state.concat(action.data)
        case 'UPDATE_DATA':
            return state.map((x,i)=>{
                if(i===action.index) return action.value;
                return x;
            })
        default:
            return state
    }
}

const formApp = combineReducers({
    id:formId,
    data:formData
})
export default formApp;
