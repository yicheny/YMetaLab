import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from "react-router-dom";
import clsx from 'clsx';
import "./Menu.scss";

// const mockOption = Array.from(Array(40),(x,i)=>({text:i,to:i}));

export default function Menu({option}) {
    const history = useHistory();
    const location = useLocation();
    const [currentPath,setCurrentPath] = useState(location.pathname);

    useEffect(()=>{
        return history.listen((location)=>{
            setCurrentPath(location.pathname)
        });
    },[history])

    return <div className="doc-menu">
        {
            option.map((x)=>{
                return <div key={x.to}
                            className={clsx('doc-menu-item',{active:x.to===currentPath})}
                            onClick={()=>history.push(x.to)}>
                    {x.text}
                </div>
            })
        }
    </div>
};
Menu.defaultProps = {

}
