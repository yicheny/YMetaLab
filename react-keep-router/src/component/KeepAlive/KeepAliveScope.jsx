import React, { createContext, PureComponent, useContext } from 'react';
import { LIFE_CYCLE_ENUMS, OBSERVER_STATUS_ENUMS } from "./Enums";
import { KeepAliveProvider } from "./KeepAliveContext.jsx";
import utils from './utils';

const KeepAliveScopeContext = createContext({});

export function useKeepAliveScope(){
    return useContext(KeepAliveScopeContext);
}

export default class KeepAliveScope extends PureComponent {
    constructor(props) {
        super(props);
        this.container = null;
        // this.container = createContainer();

        this.state = {};//用于保存key和children信息
        this.nodes = {};//用于保存渲染的DOM
    }

    updateCache = (cacheKey,children) => {
        const getNextCache = () => {
            const isOldCache = () => {
                const cache = this.state[cacheKey];
                if(utils.isObject(cache)) return cache.children === children
            }

            const getOldCache = () => {
                return this.state[cacheKey]
            }

            const createNewCache = () => {
                return {
                    cacheKey,
                    children,
                    lifeCycle:LIFE_CYCLE_ENUMS.MOUNT,
                    observerStatus:OBSERVER_STATUS_ENUMS.UNLISTEN
                }
            }

            return {
                [cacheKey]: isOldCache() ? getOldCache() : createNewCache()
            }
        }

        return new Promise(resolve=>{
            this.setState(getNextCache(),() => {
                resolve([this.nodes[cacheKey],this.state[cacheKey]]);
            });
        });
    }

    render() {
        return <KeepAliveScopeContext.Provider value={ {
                updateCache:this.updateCache,
                cacheMap:this.state
            } }>
            {
                this.props.children
            }
            {
                <div style={{display:'none'}} ref={node => this.container = node}>
                    {
                        Object.values(this.state).map((cache)=>{
                            const {cacheKey,children} = cache;
                            return (
                                <div key={cacheKey} ref={node=>{
                                    this.nodes[cacheKey] = node;
                                }}>
                                    <KeepAliveProvider value={{cache}}>
                                        {children}
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
