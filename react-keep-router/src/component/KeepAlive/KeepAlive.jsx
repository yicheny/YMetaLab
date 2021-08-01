import React, {useEffect, useMemo, memo, useRef} from "react";
import { useKeepAlive } from "./KeepAliveProvider.jsx";

function KeepAlive({children,cacheKey}){
    const {updateCache} = useKeepAlive();
    const containerRef = useRef();

    useEffect(()=>{
        updateCache(cacheKey,children).then(nodeCache => {
            containerRef.current.appendChild(nodeCache);
        } );
    },[
        updateCache,
        cacheKey,
        children
    ])

    return <div ref={containerRef}/>
}

export default memo(KeepAlive)
