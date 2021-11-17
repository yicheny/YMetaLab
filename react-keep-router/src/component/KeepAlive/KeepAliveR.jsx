import React, { useEffect, memo, useRef, PureComponent } from "react";
import { useKeepAliveScopeR } from "./KeepAliveScopeR.jsx";
import utils from "./utils";

function KeepAliveR({ children, cacheKey }) {
    const { updateCache } = useKeepAliveScopeR();
    const containerRef = useRef();

    useEffect(() => {
        if(!utils.isString(cacheKey)) throw new Error("cacheKey必须是字符类型！")
        let c = {};
        updateCache(cacheKey, children).then(([cache]) => {
            // console.log('cache',cache)
            c = cache;
            if(c.node && p){
                containerRef.current.appendChild(c.node)
            }
        });
        return ()=>{
            if(c.node) c.node.remove();
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
