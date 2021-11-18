import React, { createContext, Fragment, PureComponent, useContext } from 'react';
import ReactDOM from 'react-dom'
import { KeepAliveProvider } from "./KeepAliveContext.jsx";
import utils from './utils';
import { createLRU } from "./createLRU";

const KeepAliveScopeContext = createContext({});

export function useKeepAliveScopeR() {
    return useContext(KeepAliveScopeContext);
}

export default class KeepAliveScopeR extends PureComponent {
    constructor(props) {
        super(props);
        this.container = null;

        this.lru = createLRU(1);

        //保存key、children、node【DOM】
        this.store = new Map();
    }

    componentDidUpdate() {

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

        console.log('updateCache');
        return new Promise(resolve => {
            updateCache();
            this.deleteKey = this.lru.update(cacheKey);
            if(this.deleteKey){
                // const cache = this.store.get(this.deleteKey);
                // cache.node.parentNode.removeChild(cache.node);
            }
            this.forceUpdate(() => {
                console.dir(this.container.children)
                resolve([
                    this.store.get(cacheKey),
                    ()=>{
                        if(!this.deleteKey) return null;
                        const cache = this.store.get(this.deleteKey);
                        cache.children = null;
                        cache.node = null;
                        // cache.node.remove();
                        // cache.node = null;
                        this.forceUpdate(()=>{})
                    }
                ])
            })
        });
    }

    render() {
        console.log(
            "a44",
            this.store,
            // this.lru.cacheMap
        )

        const lruKeys = [...this.lru.cacheMap.keys()];
        const keys = [...this.lru.cacheMap.keys()];
        return <KeepAliveScopeContext.Provider value={ {
            updateCache: this.updateCache,
        } }>
            <Fragment>
                {
                    this.props.children
                }
                {
                    <div style={ { display: 'none' } } ref={ node => this.container = node }>
                        {
                            keys.map((key) => {
                                const cache = this.store.get(key);
                                const { cacheKey, children } = cache;
                                const isDelete = !lruKeys.includes(cacheKey);
                                return <Keeper cache={ cache } key={ cacheKey } isDelete={isDelete}>{ children }</Keeper>
                            })
                        }
                    </div>
                }
            </Fragment>
        </KeepAliveScopeContext.Provider>;
    }
}

class Keeper extends PureComponent {
    render() {
        const cache = this.props.cache;
        return <div ref={ node => {
            if(this.props.isDelete){
                cache.node = null;
            }else{
                cache.node = node
            }
        } }>
            <KeepAliveProvider value={ { cache } }>
                { this.props.children }
            </KeepAliveProvider>
        </div>
    }
}
