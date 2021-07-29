import React, { useState } from 'react';
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Menu from "./Menu.jsx";
// import {KeepAliveProvider,KeepAlive} from 'react-keep-router';//发布包测试
import {Test} from '../src/Test.jsx';//日常修改测试

// console.log({KeepAliveProvider,KeepAlive})

console.log(Test)

export default function App(){
    return <Router>
        <Menu/>
        <Switch>
            <Route path='/view/1'><View title='view1'/></Route>
            <Route path='/view/2'><View title='view2'/></Route>
            <Route path='/view/keep'><View title='keep'/></Route>
            <Route>Home</Route>
        </Switch>
    </Router>
}

function View(props){
    return <div>
        <h2>标题：{props.title}</h2>
        <Counter key={props.title}/>
    </div>
}

function Counter(){
    const [count,setCount] = useState(0)

    return <>
        <h3>Count：{count}</h3>
        <button onClick={()=>setCount(count+1)}>增加</button>
    </>
}
