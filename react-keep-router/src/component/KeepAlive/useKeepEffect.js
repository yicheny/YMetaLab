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
            const mountFun = callbackRef.current;
            const umountFun = mountFun();
            observer.add(utils.getMountKey(cacheKey), mountFun);
            observer.add(utils.getUmountKey(cacheKey), umountFun);
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
