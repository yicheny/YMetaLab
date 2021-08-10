import React from "react";
import './Anchor.scss';

export default function Anchor({options,indent}){
    return <div className="doc-anchor">
        {
            options.map(o=>{
                return <div className='doc-anchor-item' key={o.id}
                            onClick={()=>handleClick(o.id)}
                            style={{paddingLeft:indent * o.level}}>
                    <span className="text">{o.text}</span>
                </div>
            })
        }
    </div>

    function handleClick(id){
        const element = document.getElementById(id);
        if(element) element.scrollIntoView({behavior:"smooth"});
    }
}
Anchor.defaultProps = {
    options: [],
    indent: 24
}
