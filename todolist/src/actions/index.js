import axios from 'axios';

export const UPDATE_ID = 'UPDATE_ID'
export const ADD_DATA = 'ADD_DATA'
export const UPDATE_DATA = 'UPDATE_DATA'
export const UPDATE_COMIC_SENTENCE = "UPDATE_COMIC_SENTENCE"

export function updateIdCreator(id){
    return {
        type:UPDATE_ID,
        id
    }
}

export function updateComicSentenceCreator(){
    return function thunk(dispatch){
        //这里视情况可以执行dispatch,比如说发起请求的通知
        return axios.get(`http://v1.hitokoto.cn`).then(r=>{
            dispatch({type:UPDATE_COMIC_SENTENCE,comicSentence:r.data})
        }).catch(()=>{
            console.error('v1.hitokoto.cn请求失败！')
        })
    }
}
