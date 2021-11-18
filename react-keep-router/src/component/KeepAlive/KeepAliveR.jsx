import React, { useEffect, memo, useRef, PureComponent } from "react";
import { useKeepAliveScopeR } from "./KeepAliveScopeR.jsx";
import utils from "./utils";

function KeepAliveR({ children, cacheKey }) {
    const { updateCache } = useKeepAliveScopeR();
    const containerRef = useRef();

    useEffect(() => {
        if(!utils.isString(cacheKey)) throw new Error("cacheKey必须是字符类型！")
        console.log('mount',cacheKey);
        let c = {};
        const container = containerRef.current;
        updateCache(cacheKey, children).then(([cache,callback]) => {
            console.log('updateCache_then')
            c = cache;
            if(c.node && container && container.parentNode){
                const nextSibling = container.nextSibling;
                container.parentNode.insertBefore(c.node,nextSibling)
                container.parentNode.removeChild(containerRef.current)
            }
            callback();
        });
        return ()=>{
            console.log('unmount',cacheKey);
            if(c.node && container && container.parentNode){
                container.parentNode.removeChild(c.node)
            }
        }
    }, [updateCache, cacheKey, children,])
    return <div ref={ containerRef } className='test-keep-alive'/>
}

export default memo(KeepAliveR)

class AsyncComponent extends React.PureComponent{
    state = {
        component:null
    }

    componentDidMount() {
        const {children} = this.props;
        Promise.resolve().then(() => this.setState({component: children}));
    }

    render() {
        return this.state.component;
    }
}
