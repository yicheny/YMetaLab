import React, { createContext, PureComponent, useContext } from 'react';
import { KeepAliveProvider } from "./KeepAliveContext.jsx";
import utils from './utils';
import { createLRU } from "./createLRU";

const KeepAliveScopeContext = createContext({});

export function useKeepAliveScope(){
    return useContext(KeepAliveScopeContext);
}

const lru = createLRU(2);

export default class KeepAliveScope extends PureComponent {
    constructor(props) {
        super(props);
        this.container = null;
        // this.container = createContainer();

        //用于保存key和children信息
        this.store = new Map();
        //用于保存渲染的DOM
        this.nodes = new Map();
    }

    updateCache = (cacheKey,children) => {
        const updateCache = () => {
            const isOldCache = () => {
                const cache = this.store.get(cacheKey)
                if(utils.isObject(cache)) return cache.children === children
                return false;
            }

            const getOldCache = () => {
                return this.store.get(cacheKey)
            }

            const createNewCache = () => {
                const newCache = {
                    cacheKey,
                    children,
                };

                this.store.set(cacheKey,newCache);
                return newCache
            }

            return isOldCache() ? getOldCache() : createNewCache()
        }

        return new Promise(resolve=>{
            updateCache();
            const deleteKey = lru.update(cacheKey);
            this.forceUpdate(()=>{
                resolve(this.nodes.get(cacheKey),this.store.get(cacheKey))
            })
        });
    }

    render() {
        // console.log('state',this.state);
        // console.log('nodes',this.nodes);
        // const renderStore = [...this.store.values()].filter(x=>lru.cacheMap.has(x.cacheKey))
        return <KeepAliveScopeContext.Provider value={ {
                updateCache:this.updateCache,
            } }>
            {
                this.props.children
            }
            {
                <div style={{display:'none'}} ref={node => this.container = node}>
                    {
                        [...this.store.values()].map((cache)=>{
                            // const cache = this.store.get(key);
                            const {cacheKey,children} = cache;
                            return (
                                <div key={cacheKey} ref={node=>{
                                    this.nodes.set(cacheKey,node);
                                }}>
                                    <KeepAliveProvider value={{cache}}>
                                        {lru.cacheMap.has(cacheKey) ? children : null}
                                    </KeepAliveProvider>
                                </div>
                            )
                        })
                    }
                </div>
            }
            {/*{
                createPortal(Object.values(this.state).map(({cacheKey,children})=>{
                    return <div key={cacheKey} ref={node=>{
                        this.nodes[cacheKey] = node;
                    }}>
                        {children}
                    </div>
                }),this.container)
            }*/}
        </KeepAliveScopeContext.Provider>;
    }
}

// function createContainer(){
//     const dom = document.createElement('div');
//     dom.style.display = 'none';
//     dom.className = 'keep-alive-container';
//     document.body.appendChild(dom);
//     return dom;
// }
