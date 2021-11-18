import React,{ createContext, useContext, useState } from "react";
import { KeepAlive } from "../../lib";

const ContextTestContext = createContext();

export default function ContextTest(){
    const [value,setValue] = useState(0);

    return <ContextTestContext.Provider value={value}>
        <h3>这里是父组件，当前值是{value}</h3>
        <button onClick={()=>setValue(value+1)}>增加</button>
        <KeepAlive cacheKey='/app/context-test/child'>
            <Child/>
        </KeepAlive>
    </ContextTestContext.Provider>
}

function Child(){
    const value = useContext(ContextTestContext);
    const [num,setNum] = useState(0);

    return <div>
        <h3>这里是Child组件</h3>
        <p>从上下文获取到的值是{value}</p>
        <p>
            组件自身的状态值是{num}
            <button onClick={()=>setNum(num+1)}>增加</button>
        </p>
    </div>
}
