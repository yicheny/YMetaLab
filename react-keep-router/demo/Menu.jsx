import React from "react";
import { Link } from "react-router-dom";
import './Menu.scss';

const menuConfig = [
    {text:"view1",to:"/app/view1"},
    // {text:"portal-test",to:"/app/portal-test"},
    {text:"keepView",to:"/app/keep"},
    {text:"effectText",to:'/app/effect-test'}
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
