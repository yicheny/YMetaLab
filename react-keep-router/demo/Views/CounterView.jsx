import React,{useState} from 'react';

export default function CounterView(props){
    return <div>
        <h2>标题：{props.title}</h2>
        <Counter/>
    </div>
}

function Counter(){
    const [count,setCount] = useState(0)

    return <>
        <h3>Count：{count}</h3>
        <button onClick={()=>setCount(count+1)}>增加</button>
    </>
}
