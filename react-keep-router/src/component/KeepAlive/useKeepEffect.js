import { useEffect, useRef } from "react";
import { useKeepAlive } from "./KeepAliveContext.jsx";
import observer from "./Observer";
import utils from "./utils";
import { LIFE_CYCLE_ENUMS, OBSERVER_STATUS_ENUMS } from "./Enums";

export default function useKeepEffect(callback) {
    const value = useKeepAlive();
    const cache = value.cache;

    const callbackRef = useRef(() => {});
    callbackRef.current = callback;

    // console.log('value',value);

    useEffect(() => {
        if(!utils.isObject(cache)) return ;

        const {cacheKey} = cache;

        if(cache.observerStatus === OBSERVER_STATUS_ENUMS.UNLISTEN){
            if(cache.lifeCycle !== LIFE_CYCLE_ENUMS.MOUNT) return ;
            let unmountFun = callbackRef.current();
            observer.add(utils.getMountKey(cacheKey), ()=>{
                unmountFun = callbackRef.current();
            });
            observer.add(utils.getUmountKey(cacheKey), ()=>{
                if(utils.isFunction(unmountFun)) unmountFun();
            });
            cache.observerStatus = OBSERVER_STATUS_ENUMS.LISTEN;
            cache.lifeCycle = LIFE_CYCLE_ENUMS.MOUNTED;
        }

        return () => {
            if(cache.observerStatus !== OBSERVER_STATUS_ENUMS.LISTEN) return null;
            if(cache.lifeCycle !== LIFE_CYCLE_ENUMS.MOUNTED) return null;
            observer.notify(utils.getUmountKey(cacheKey));
            cache.lifeCycle = LIFE_CYCLE_ENUMS.MOUNT;
        }
    }, [cache])
}
