import React, {useEffect,  memo, useRef} from "react";
import { useKeepAlive } from "./KeepAliveProvider.jsx";

function KeepAlive({children,cacheKey}){
    const {updateCache} = useKeepAlive();
    const containerRef = useRef();

    useEffect(()=>{
        let node = null;

        updateCache(cacheKey,children).then(nodeCache => {
            // console.log('nodeCache',nodeCache)
            node = nodeCache;
            containerRef.current.appendChild(nodeCache);
        });

        return ()=>{
            if(node && containerRef.current){
                containerRef.current.removeChild(node);
            }
        }
    },[
        updateCache,
        cacheKey,
        children
    ])

    return <div ref={containerRef}/>
}

export default memo(KeepAlive)
