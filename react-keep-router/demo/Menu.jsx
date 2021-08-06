import React from "react";
import { Link } from "react-router-dom";
import './Menu.scss';

const menuConfig = [
    {text:"无缓存组件",to:"/app/view1"},
    // {text:"portal-test",to:"/app/portal-test"},
    {text:"缓存组件测试",to:"/app/keep"},
    {text:"缓存组件副作用测试",to:'/app/effect-test'},
    {text:"多缓存组件测试",to:'/app/many-component-test'},
    {text:"缓存组件上下文测试",to:'/app/context-test'},
]

export default function Menu(){
    return <div className='menu'>
        {
            menuConfig.map((x,i)=>{
                return <span className='item' key={i}>
                    <Link to={x.to}>{x.text}</Link>
                </span>
            })
        }
    </div>
}
