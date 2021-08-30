import React, {useState} from 'react';
import ErrorBoundary from "./ErrorBoundary";

//官方示例：https://codepen.io/gaearon/pen/wqvxGa?editors=0010

export default function ErrorBoundaryView() {
    return (<ErrorBoundary>
        <Counter/>
    </ErrorBoundary>);
}

function Counter(props) {
    const [count,setCount] = useState(0);
    if(count === 3) throw new Error('Counter组件崩溃啦！');
    return <div>
        <button onClick={()=>setCount(count+1)}>add</button><br/>
        Counter：{count}
    </div>
}

