import React, { useEffect, memo, useRef } from "react";
import { useKeepAliveScope } from "./KeepAliveScope.jsx";
import utils from "./utils";
import observer from "./Observer";
import { LIFE_CYCLE_ENUMS, OBSERVER_STATUS_ENUMS } from "./Enums";



function KeepAlive({ children, cacheKey }) {
    const { updateCache,cacheMap } = useKeepAliveScope();
    const containerRef = useRef();

    const statusCache = cacheMap[cacheKey];

    useEffect(() => {
        if(!utils.isString(cacheKey)) throw new Error("cacheKey必须是字符类型！")

        let node = null;
        updateCache(cacheKey, children).then((nodeCache) => {
            node = nodeCache;
            containerRef.current.appendChild(nodeCache);
        });

        return () => {
            if (node && containerRef.current) {
                containerRef.current.removeChild(node);
            }
        }
    }, [
        updateCache,
        cacheKey,
        children,
    ])

    useEffect(()=>{
        if(!utils.isObject(statusCache)) return ;
        const {cacheKey} = statusCache;
        mount();
        return unmount;

        function mount(){
            if(statusCache.observerStatus !== OBSERVER_STATUS_ENUMS.LISTEN) return ;
            if(statusCache.lifeCycle !== LIFE_CYCLE_ENUMS.MOUNT) return ;
            observer.notify(utils.getMountKey(cacheKey));
            statusCache.lifeCycle = LIFE_CYCLE_ENUMS.MOUNTED;
        }

        function unmount(){
            if (statusCache.observerStatus !== OBSERVER_STATUS_ENUMS.LISTEN) return ;
            if (statusCache.lifeCycle !== LIFE_CYCLE_ENUMS.MOUNTED) return ;
            observer.notify(utils.getUmountKey(cacheKey));
            statusCache.lifeCycle = LIFE_CYCLE_ENUMS.MOUNT;
        }
    },[statusCache])

    // console.log('statusCache',statusCache)
    return <div ref={ containerRef }/>
}

export default memo(KeepAlive)
