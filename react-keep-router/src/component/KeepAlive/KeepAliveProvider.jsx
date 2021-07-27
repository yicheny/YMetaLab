import { createContext, PureComponent } from 'react';
import { createPortal } from 'react-dom';

const KeepAliveContext = createContext();

class Provider extends PureComponent{
    constructor(props) {
        super(props);
        this.storeDom = createProvider().getDom();
    }

    componentWillMount() {

    }

    render(){
        return createPortal(
            this.props.children,
            this.storeDom
        )
    }
}

class ProviderDOM{
    static Dom = null;

    constructor() {
        if(ProviderDOM.Dom===null) this._setDom();
    }

    _setDom(){
        ProviderDOM.Dom = createDom();

        function createDom(){
            const dom = document.createElement('div');
            dom.style.display = 'none';
            document.body.appendChild(dom);
            return dom;
        }
    }

    getDom(){
        return ProviderDOM.Dom;
    }
}

function createProvider(...params){
    return new ProviderDOM(...params);
}
