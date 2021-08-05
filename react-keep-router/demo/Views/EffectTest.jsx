import React, { useEffect, useState } from 'react';
import useKeepEffect from "../../src/component/KeepAlive/useKeepEffect";

export default function EffectTest() {
    const [value,setValue] = useState('initValue');

    useKeepEffect(()=>{
        console.log(`useKeepEffect，组件装载啦！闭包值为${value}`);
        return () => {
            console.log(`useKeepEffect，组件卸载啦！闭包值为${value}`)
        }
    })

    useEffect(()=>{
        console.log(`副作用执行啦！当前值为${value}`);
        return () => {
            console.log(`组件卸载啦！当前值为${value}`)
        }
    },[value])

    return (<div>
        <h3>失去焦点时触发事件，请注意控制台打印信息</h3>
        <input defaultValue={value} onBlur={e => setValue(e.target.value)}/>
    </div>)
};
