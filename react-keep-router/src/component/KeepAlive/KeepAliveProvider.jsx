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
        this.cache = createCache();
        console.log('constructor',this.storeDom)
    }

    componentDidMount() {
        createPortal(this.cache.toValuesArray(),this.storeDom);
    }

    addComponentCache(key,component){
        this.cache.setValue(key,component);
        console.dir(component)
        this.storeDom.appendChild(component);
    }

    getComponentCache(key){
        return this.cache.getValue(key);
    }

    render() {
        return <KeepAliveContext.Provider value={ {
                storeDom:this.storeDom,
                addComponentCache:this.addComponentCache.bind(this),
                getComponentCache:this.getComponentCache.bind(this)
            } }>
            { this.props.children }
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
