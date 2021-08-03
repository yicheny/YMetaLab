import React, { createContext, PureComponent, useContext, useMemo, useEffect, Fragment } from 'react';

const KeepAliveContext = createContext({});
const utils = createUtils();

export function useKeepAlive(){
    return useContext(KeepAliveContext);
}

export default class KeepAliveProvider extends PureComponent {
    constructor(props) {
        super(props);
        this.container = null;
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
            }
        </KeepAliveContext.Provider>;
    }
}

function createUtils(){
    return {
        isNil(x){
            return x === undefined || x === null;
        }
    }
}
