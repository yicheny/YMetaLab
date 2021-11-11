import React, { useEffect, memo, useRef, useState } from "react";
import { useKeepAliveScope } from "./KeepAliveScope.jsx";
import utils from "./utils";
import observer from "./Observer";

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
                // eslint-disable-next-line react-hooks/exhaustive-deps
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
            observer.notify(utils.getMountKey(cacheKey));
        }

        function unmount(){
            observer.notify(utils.getUmountKey(cacheKey));
        }
    },[cache])

    // console.log('cache',cache)
    return <div ref={ containerRef }/>
}

export default memo(KeepAlive)
