import React, { useState } from 'react';
import useKeepAliveEffect from "../../src/utils/useKeepAliveEffect";

export default function EffectTest() {
    const [value,setValue] = useState(0);

    useKeepAliveEffect(()=>{
        console.log(`useKeepAliveEffect，Active！闭包值为${value}`);
        return () => {
            console.log(`useKeepAliveEffect，unActive！闭包值为${value}`)
        }
    })

    // useEffect(()=>{
    //     console.log(`EffectTest 副作用执行啦！当前值为${value}`);
    //     return () => {
    //         console.log(`EffectTest 副作用卸载啦！当前值为${value}`)
    //     }
    // },[value])

    return (<div>
        <h3>失去焦点时触发事件，请注意控制台打印信息</h3>
        <input value={value} onChange={e => setValue(e.target.value)}/>
        <button onClick={()=>setValue(value+1)}>增加</button>
    </div>)
};
