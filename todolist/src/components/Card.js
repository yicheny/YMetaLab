import React, {useEffect} from 'react';

function Card({info,onClick,id,comicSentence,updateComicSentence}) {

    useEffect(()=>{
        updateComicSentence();
        const timeId = setInterval(updateComicSentence,7000)
        return ()=>clearInterval(timeId);
    },[updateComicSentence])

    return (<div>
        <button onClick={()=>onClick(id)}>更新Id</button>
        <div>id：{id}</div>
        <div>权限：{info}</div>
        <div>语句：{comicSentence.hitokoto}---{comicSentence.from}</div>
    </div>);
}

export default Card;
