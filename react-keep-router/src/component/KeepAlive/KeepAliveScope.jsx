import React, { createContext, Fragment, PureComponent, useContext } from 'react';
import ReactDOM from 'react-dom'
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

        this.lru = createLRU(1);
        this.deleteKey = null;
        // this.needRerender = false;

        //保存key、children、node【DOM】
        this.store = new Map();
    }

    componentDidUpdate() {
        if(this.deleteKey){
            this.store.delete(this.deleteKey)
            this.deleteKey = null;
            this.forceUpdate();
        }
        // if(this.needRerender){
        //     this.forceUpdate();
        //     this.needRerender = false;
        //     console.log('needRerender')
        // }
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
            this.deleteKey = this.lru.update(cacheKey);
            // console.log('f1');
            this.forceUpdate(() => {
                resolve(this.store.get(cacheKey))

                // console.log('f2',this.store)
                // if (!this.deleteKey) return;
                // this.store.delete(this.deleteKey)
                // console.log('f3');
                // this.forceUpdate(()=>console.log('f5'));
                // console.log('f4');

                // const cache = this.store.get(deleteKey);
                // const node = cache.node
                // if(node){
                //     node.remove();
                //     cache.node = null;
                //     console.log('f2');
                //     this.forceUpdate(()=>{
                //         this.store.delete(deleteKey)
                //         console.log('f3');
                //     });
                // }
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
           <Fragment>
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
                               // if(cache.node){
                               //     console.log(cache.node.parentNode);
                               // }
                               // return cacheKey === this.deleteKey ? null : <Keeper key={ cacheKey } cache={ cache }>{ children }</Keeper>
                               return <Keeper key={ cacheKey } cache={ cache } isDelete={cacheKey===this.deleteKey}>{ children }</Keeper>
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
           </Fragment>
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
    render() {
        const cache = this.props.cache;
        return <div ref={ node => {
            // if(node === null) console.log(cache.cacheKey,'unmountNode')
            if(this.props.isDelete){
                if(cache.node){
                    cache.node.remove();
                    cache.node = null;
                }
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
