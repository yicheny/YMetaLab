import { useEffect, useMemo, memo } from "react";
import { useKeepAlive } from "./KeepAliveProvider.jsx";

function KeepAlive({children,cacheKey}){
    const {storeDom,getComponentCache,addComponentCache} = useKeepAlive();

    const componentCache = useMemo(()=>{
        return getComponentCache(cacheKey);
    },[getComponentCache,cacheKey]);

    const render = componentCache || children;

    useEffect(()=>{
        if(componentCache){
            storeDom.removeChild(componentCache);
        }
    },[storeDom,componentCache]);

    useEffect(()=>{
        return ()=>{
            addComponentCache(cacheKey,render)
        }
    },[cacheKey,render,addComponentCache])

    return render;
}

export default memo(KeepAlive)
