import React, { PureComponent } from 'react';
import { createLRU } from "./createLRU";

function Item(props){
    return <div>
        item：{props.text}
    </div>
}

let key = 0;

export class DestroyComponent extends PureComponent{
    constructor(props) {
        super(props);

        this.store = new Map();
        this.lru = createLRU(4);

        this.timeId = null;
        this.container = null;
    }

    componentDidMount(prevProps, prevState, snapshot) {
        this.timeId = setInterval(this.update,3000)
    }

    componentWillUnmount() {
        if(this.timeId) clearInterval(this.timeId)
    }

    update = () => {
        console.log('update开始执行啦！',this.store)

        key+=1;
        this.store.set(key,{
            key,
            children:<Item text={key}/>,
        })
        const dKey = this.lru.update(key);
        if(!dKey) return ;
        this.forceUpdate(()=>{
            this.store.delete(dKey)
        })
    }

    render(){
        // console.log(this.store)
        return <div className="destroy-component" ref={container => this.container = container}>
            测试测试！
            {
                [...this.lru.cacheMap.keys()].map((k)=>{
                    const x = this.store.get(k)
                    return <div key={x.key} ref={(node)=>{
                        x.node = node;
                    }}>
                        {x.children}
                    </div>
                })
            }
        </div>
    }
}
