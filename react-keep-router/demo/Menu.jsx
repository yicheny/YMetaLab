import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {useHistory} from "react-router-dom";
import './Menu.scss';

export default function Menu({config}){
    return <div className='menu'>
        {
            config.map((x,i)=>{
                return x.children ? <SubMenu data={x} level={1} key={i}/> : <MenuItem data={x} key={i}/>
            })
        }
    </div>
}

function MenuItem({data,style}){
    const pathname = usePathname();

    return <div className={`item ${pathname===data.to ? 'active' : ''}`} style={style}>
        <Link to={data.to}>{data.text}</Link>
    </div>
}

const INDENT = 32;
function SubMenu({data,level}){
    return <div className="submenu">
        <div className='submenu-title item'>{data.text}</div>
        {
            data.children.map((x,i)=>{
                return x.children
                    ? <SubMenu level={level+1} config={x.children} key={i}/>
                    : <MenuItem data={x}  style={{marginLeft:INDENT*level}} key={i}/>
            })
        }
    </div>
}

function usePathname(){
    const history = useHistory();
    const [pathname,setPathname] = useState(history.location.pathname);

    useEffect(()=>{
        return history.listen(location => {
            setPathname(location.pathname)
        });
    },[])

    return pathname;
}
