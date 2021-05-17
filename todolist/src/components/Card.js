import React from 'react';

function Card({info,onClick,id}) {
    return (<div>
        <button onClick={()=>onClick(id)}>更新Id</button>
        <div>id：{id}</div>
        <div>权限：{info}</div>
    </div>);
}

export default Card;
