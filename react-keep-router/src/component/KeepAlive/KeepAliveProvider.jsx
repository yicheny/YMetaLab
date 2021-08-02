import React, { createContext, PureComponent, useContext, useMemo, useEffect, Fragment } from 'react';
import { createPortal } from 'react-dom';

const KeepAliveContext = createContext({});
const utils = createUtils();

export function useKeepAlive(){
    return useContext(KeepAliveContext);
}

export default class KeepAliveProvider extends PureComponent {
    constructor(props) {
        super(props);
        // this.store = createProviderDOM().dom;
        this.state = {};//用于保存key和children信息
        this.nodes = {};//用于保存渲染的DOM
    }

    updateCache = (key,children) => {
        return new Promise(resolve=>{
            this.setState({[key]:{key,children}},() => {
                resolve(this.nodes[key]);
            })
        });
    }

    render() {
        return <KeepAliveContext.Provider value={ {
                updateCache:this.updateCache
            } }>
            {
                this.props.children
            }
            {/*{
                <div style={{display:'none'}} ref={node => this.container = node}>
                    {
                        Object.values(this.state).map(({key,children})=>{
                            // console.log('normal',key,children)
                            return <div key={key} ref={node=>{
                                this.nodes[key] = node;
                            }}>
                                {children}
                            </div>
                        })
                    }
                </div>
            }*/}
            {/*{
                createPortal(Object.values(this.state).map(({key,children})=>{
                        // console.log('createPortal',key,children)
                        return <div key={key} ref={node=>{
                            this.nodes[key] = node;
                        }}>
                            {children}
                        </div>
                    }),
                    // document.getElementById('root')
                    this.store
                )
            }*/}
            {
                <Portal>
                    {
                        Object.values(this.state).map(({key,children})=>{
                            // console.log('createPortal',key,children)
                            return <div key={key} ref={node=>{
                                this.nodes[key] = node;
                            }}>
                                {children}
                            </div>
                        })
                    }
                </Portal>
            }
        </KeepAliveContext.Provider>;
    }
}

class ProviderDOM {
    static _dom = null;

    _setDom() {
        ProviderDOM._dom = createDom();

        function createDom() {
            const dom = document.createElement('div');
            dom.className = 'keep-alive-provider';
            dom.style.display = 'none';
            document.body.appendChild(dom);
            return dom;
        }
    }

    get dom() {
        if (ProviderDOM._dom === null) this._setDom();
        return ProviderDOM._dom;
    }
}

function createProviderDOM(...params) {
    return new ProviderDOM(...params);
}

function createUtils(){
    return {
        isNil(x){
            return x === undefined || x === null;
        }
    }
}

function Portal(props){
    return createPortal(props.children,useContainer());
}

function useContainer(className = 'portal-container'){
    const container = useMemo(()=>{
        const dom = document.createElement('div');
        dom.className = className;
        dom.style.display = 'none';
        return dom;
    },[className])

    useEffect(()=>{
        document.body.appendChild(container);
        return () => document.body.removeChild(container);
    },[container])

    return container;
}
