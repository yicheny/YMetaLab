import React from "react";
import './Anchor.scss';

export default function Anchor({options,indent}){
    return <div className="doc-anchor">
        {
            options.map(o=>{
                return <div className='doc-anchor-item' key={o.id}
                            onClick={()=>handleClick(o.id)}
                            style={{marginLeft:indent * o.level}}>
                    {o.text}
                </div>
            })
        }
    </div>

    function handleClick(id){
        const element = document.getElementById(id);
        if(element) element.scrollIntoView(false);
    }
}
Anchor.defaultProps = {
    options: [],
    indent: 24
}
