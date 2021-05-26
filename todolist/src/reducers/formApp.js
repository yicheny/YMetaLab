import { combineReducers } from 'redux'
import {ADD_DATA, UPDATE_COMIC_SENTENCE, UPDATE_DATA, UPDATE_ID} from "../actions";

function formId(state=0,action){
    switch (action.type) {
        case UPDATE_ID:
            return action.id
        default:
            return state
    }
}

function formData(state=[],action){
    switch (action.type) {
        case ADD_DATA:
            return state.concat(action.data)
        case UPDATE_DATA:
            return state.map((x,i)=>{
                if(i===action.index) return action.value;
                return x;
            })
        default:
            return state
    }
}

function comicSentence(state={},action){
    switch (action.type) {
        case UPDATE_COMIC_SENTENCE:
            return action.comicSentence;
        default:
            return state;
    }
}

const formApp = combineReducers({
    id:formId,
    data:formData,
    comicSentence
})
export default formApp;
