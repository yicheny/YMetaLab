import { useEffect, useRef } from "react";
import { useKeepAlive } from "./KeepAliveContext.jsx";
import observer from "./Observer";
import utils from "./utils";

export default function useKeepEffect(callback) {
    const {cache} = useKeepAlive();

    const callbackRef = useRef(() => {});
    callbackRef.current = callback;

    useEffect(() => {
        if(!utils.isObject(cache)) return ;

        const {cacheKey} = cache;
        let mounted = false;

        if(!mounted){
            let unmountFun = callbackRef.current();
            mounted = true;
            observer.add(utils.getMountKey(cacheKey), ()=>{
                if(mounted) return ;
                unmountFun = callbackRef.current();
                mounted = true;
            });
            observer.add(utils.getUmountKey(cacheKey), ()=>{
                if(!mounted) return ;
                if(!utils.isFunction(unmountFun)) return null;
                unmountFun();
                mounted = false;
            });
        }

        return () => {
            observer.notify(utils.getUmountKey(cacheKey));
        }
    }, [cache])
}
