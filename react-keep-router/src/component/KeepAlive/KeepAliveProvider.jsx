import React, { createContext, PureComponent, useContext } from 'react';
import { LIFE_CYCLE_ENUMS, OBSERVER_STATUS_ENUMS } from "./Enums";

const KeepAliveContext = createContext({});

export function useKeepAliveProvider(){
    return useContext(KeepAliveContext);
}

export default class KeepAliveProvider extends PureComponent {
    constructor(props) {
        super(props);
        this.container = null;
        // this.container = createContainer();

        this.state = {};//用于保存key和children信息
        this.nodes = {};//用于保存渲染的DOM
    }

    updateCache = (key,children) => {
        return new Promise(resolve=>{
            const nextState = {
                [key]:{
                    key,
                    children,
                    lifeCycle:LIFE_CYCLE_ENUMS.MOUNT,
                    observerStatus:OBSERVER_STATUS_ENUMS.UNLISTEN
                }
            };
            this.setState(nextState,() => {
                resolve(this.nodes[key],this.state[key]);
            })
        });
    }

    render() {
        return <KeepAliveContext.Provider value={ {
                updateCache:this.updateCache,
                cacheMap:this.state
            } }>
            {
                this.props.children
            }
            {
                <div style={{display:'none'}} ref={node => this.container = node}>
                    {
                        Object.values(this.state).map(({key,children})=>{
                            return <div key={key} ref={node=>{
                                this.nodes[key] = node;
                            }}>
                                {children}
                            </div>
                        })
                    }
                </div>
            }
            {/*{
                createPortal(Object.values(this.state).map(({key,children})=>{
                    return <div key={key} ref={node=>{
                        this.nodes[key] = node;
                    }}>
                        {children}
                    </div>
                }),this.container)
            }*/}
        </KeepAliveContext.Provider>;
    }
}

// function createContainer(){
//     const dom = document.createElement('div');
//     dom.style.display = 'none';
//     dom.className = 'keep-alive-container';
//     document.body.appendChild(dom);
//     return dom;
// }
