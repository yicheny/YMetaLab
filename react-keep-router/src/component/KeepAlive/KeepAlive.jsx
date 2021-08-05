import React, { useEffect, memo, useRef, useState } from "react";
import { useKeepAliveScope } from "./KeepAliveScope.jsx";
import utils from "./utils";
import observer from "./Observer";
import { LIFE_CYCLE_ENUMS, OBSERVER_STATUS_ENUMS } from "./Enums";

function KeepAlive({ children, cacheKey }) {
    const { updateCache } = useKeepAliveScope();
    const [ cache, setCache] =  useState();
    const containerRef = useRef();

    useEffect(() => {
        if(!utils.isString(cacheKey)) throw new Error("cacheKey必须是字符类型！")

        let node = null;
        updateCache(cacheKey, children).then(([nodeCache,statusCache]) => {
            node = nodeCache;
            setCache(statusCache);
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

    useEffect(() => {
        if(!utils.isObject(cache)) return ;
        const {cacheKey} = cache;
        mount();
        return unmount;

        function mount(){
            // console.log('mount',cacheKey);
            if(cache.observerStatus !== OBSERVER_STATUS_ENUMS.LISTEN) return ;
            if(cache.lifeCycle !== LIFE_CYCLE_ENUMS.MOUNT) return ;
            observer.notify(utils.getMountKey(cacheKey));
            cache.lifeCycle = LIFE_CYCLE_ENUMS.MOUNTED;
        }

        function unmount(){
            // console.log('unmount',cacheKey);
            if (cache.observerStatus !== OBSERVER_STATUS_ENUMS.LISTEN) return ;
            if (cache.lifeCycle !== LIFE_CYCLE_ENUMS.MOUNTED) return ;
            observer.notify(utils.getUmountKey(cacheKey));
            cache.lifeCycle = LIFE_CYCLE_ENUMS.MOUNT;
        }
    },[cache])

    // console.log('cache',cache)
    return <div ref={ containerRef }/>
}

export default memo(KeepAlive)
