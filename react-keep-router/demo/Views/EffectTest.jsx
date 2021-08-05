import React, { useState } from 'react';
import useKeepEffect from "../../src/component/KeepAlive/useKeepEffect";

export default function EffectTest() {
    const [value,setValue] = useState(0);

    useKeepEffect(()=>{
        console.log(`useKeepEffect，副作用执行啦！闭包值为${value}`);
        return () => {
            console.log(`useKeepEffect，组件卸载啦！闭包值为${value}`)
        }
    })

    // useEffect(()=>{
    //     console.log(`副作用执行啦！当前值为${value}`);
    //     return () => {
    //         console.log(`组件卸载啦！当前值为${value}`)
    //     }
    // },[value])

    return (<div>
        <h3>失去焦点时触发事件，请注意控制台打印信息</h3>
        <input value={value} onChange={e => setValue(e.target.value)}/>
        <button onClick={()=>setValue(value+1)}>增加</button>
    </div>)
};
