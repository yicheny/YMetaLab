import React from 'react';
import clsx from 'clsx';
import "./Menu.scss";

// const mockOption = Array.from(Array(40),(x,i)=>({text:i,value:i}));

export default function Menu({options,onChange,value}) {
    return <div className="doc-menu">
        {
            options.map((x)=>{
                return <div key={x.value}
                            className={clsx('doc-menu-item',{active:x.value===value})}
                            onClick={()=>onChange && onChange(x.value)}>
                    {x.text}
                </div>
            })
        }
    </div>
};
Menu.defaultProps = {
    options:[]
}
