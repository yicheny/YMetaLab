import React from "react";
import { Link } from "react-router-dom";
import './Menu.scss';

const menuConfig = [
    {text:"view1",to:"/view/1"},
    {text:"view2",to:"/view/2"},
    {text:"keepView",to:"/view/keep"},
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
