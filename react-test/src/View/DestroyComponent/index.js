import React, { PureComponent } from 'react';

function Item(){
    return <div>
        Item
    </div>
}

let key = 0;

export class DestroyComponent extends PureComponent{
    constructor(props) {
        super(props);
        this.store = [];
        this.nodes = { }
        this.timeId = null;
    }

    componentDidMount(prevProps, prevState, snapshot) {
        this.timeId = setInterval(this.update,300000)
    }

    componentWillUnmount() {
        if(this.timeId) clearInterval(this.timeId)
    }

    update = () => {
        console.log('update开始执行啦！',this.store, this.nodes)
        if(this.store.length < 2){
            key+=1;
            this.store.push({
                key,
                children:<Item/>
            })
        }else{
            const x = this.store.pop();
        }
        this.forceUpdate();
    }

    render(){
        console.log(this.store)
        return <div className="destroy-component">
            测试测试！
            {
                this.store.map((x)=>{
                    return <div key={x.key} ref={(node)=>{
                        this.nodes[x.key] = node;
                    }}>
                        {x.children}
                    </div>
                })
            }
        </div>
    }
}
