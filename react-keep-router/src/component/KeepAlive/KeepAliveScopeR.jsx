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

        return new Promise(resolve => {
            updateCache();
            this.deleteKey = this.lru.update(cacheKey);
            this.forceUpdate(() => {
                resolve([
                    this.store.get(cacheKey),
                ])

                if(!this.deleteKey) return null;
                this.store.delete(this.deleteKey);
                this.forceUpdate()

                // const cache = this.store.get(this.deleteKey);
                // ReactDOM.unmountComponentAtNode(cache.node);
                // this.forceUpdate(()=>{
                //     this.store.delete(this.deleteKey);
                //     this.forceUpdate()
                // })
            })
        });
    }

    render() {
        console.log(
            "a26",
            this.store
        )
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
                                return <Keeper key={ cacheKey } cache={ cache }>{ children }</Keeper>
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
            cache.node = node
        } }>
            <KeepAliveProvider value={ { cache } }>
                { this.props.children }
            </KeepAliveProvider>
        </div>
    }
}
