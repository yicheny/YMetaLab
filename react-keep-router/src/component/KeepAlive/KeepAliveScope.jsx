import React, { createContext, PureComponent, useContext } from 'react';
// import ReactDOM from 'react-dom'
import { KeepAliveProvider } from "./KeepAliveContext.jsx";
import utils from './utils';
import { createLRU } from "./createLRU";

const KeepAliveScopeContext = createContext({});

export function useKeepAliveScope() {
    return useContext(KeepAliveScopeContext);
}

export default class KeepAliveScope extends PureComponent {
    constructor(props) {
        super(props);
        this.container = null;
        // this.container = createContainer();

        this.lru = createLRU(2);

        //保存key、children、node【DOM】
        this.store = new Map();
    }

    updateCache = (cacheKey, children) => {
        const updateCache = () => {
            const isOldCache = () => {
                const cache = this.store.get(cacheKey)
                if (utils.isObject(cache)) return cache.children === children
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

                this.store.set(cacheKey, newCache);
                return newCache
            }

            return isOldCache() ? getOldCache() : createNewCache()
        }

        return new Promise(resolve => {
            updateCache();
            const deleteKey = this.lru.update(cacheKey);
            this.forceUpdate(() => {
                resolve(this.store.get(cacheKey))

                if (!deleteKey) return;
                const cache = this.store.get(deleteKey);
                const node = cache.node
                if(node){
                    // node.remove();
                    // cache.node = null;
                    // cache.children = null;
                }
            })
        });
    }

    render() {
        console.log(
            "render",
            // this.lru.cacheMap,
            this.store
        )
        // debugger
        return <KeepAliveScopeContext.Provider value={ {
            updateCache: this.updateCache,
        } }>
            {
                this.props.children
            }
            {
                <div style={ { display: 'none' } } ref={ node => this.container = node }>
                    {
                        [...this.store.keys()].map((key) => {
                            const cache = this.store.get(key);
                            const { cacheKey, children } = cache;
                            // const isExist = this.lru.cacheMap.has(cacheKey);
                            return children === null ? null : <Keeper key={ cacheKey } cache={ cache }>{ children }</Keeper>
                        })
                    }
                </div>
            }
            {/*{
                ReactDOM.createPortal(
                    [...this.store.values()].map((cache, i) => {
                        // const cache = this.store.get(key);
                        const { cacheKey, children } = cache;
                        console.log(i, cacheKey)
                        const isExist = this.lru.cacheMap.has(cacheKey);
                        return (
                            <div key={ cacheKey } ref={ node => {
                                isExist && this.nodes.set(cacheKey, node);
                            } }>
                                <KeepAliveProvider value={ { cache } }>
                                    { isExist ? children : null }
                                </KeepAliveProvider>
                            </div>
                        )
                    })
                    , this.container)
            }*/ }
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

class Keeper extends PureComponent {
    componentWillUnmount() {
        const node = this.props.cache.node
        const parentNode = node.parent;
        console.log('componentWillUnmount')
        if(parentNode) {
            parentNode.replaceChild(node,document.createComment('注释'))
        }
    }

    render() {
        const cache = this.props.cache;
        return <div ref={ node => {
            // if(node === null) console.log(cache.cacheKey,'unmountNode')
            cache.node = node
        } }>
            <KeepAliveProvider value={ { cache } }>
                { this.props.children }
            </KeepAliveProvider>
        </div>
    }
}
