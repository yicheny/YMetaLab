import React,{ createContext, PureComponent, useContext } from 'react';
import { createPortal } from 'react-dom';
import createCache from "./CaChe";

const KeepAliveContext = createContext({});
const utils = createUtils();

export function useKeepAlive(){
    return useContext(KeepAliveContext);
}

export default class KeepAliveProvider extends PureComponent {
    constructor(props) {
        super(props);
        this.storeDom = createProvider().dom;
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
            {
                <div style={{display:'none'}}>
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
                }),this.storeDom)
            }*/}
        </KeepAliveContext.Provider>;
    }
}

class ProviderDOM {
    static _dom = null;

    _setDom() {
        ProviderDOM._dom = createDom();

        function createDom() {
            const dom = document.createElement('div');
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

function createProvider(...params) {
    return new ProviderDOM(...params);
}

function createUtils(){
    return {
        isNil(x){
            return x === undefined || x === null;
        }
    }
}
