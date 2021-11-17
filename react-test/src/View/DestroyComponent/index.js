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
        this.container = null;
    }

    componentDidMount(prevProps, prevState, snapshot) {
        this.timeId = setInterval(this.update,3000000)
    }

    componentWillUnmount() {
        if(this.timeId) clearInterval(this.timeId)
    }

    setCurrentKey = () => {

    }

    update = () => {
        if(Object.values(this.nodes).length > 3) return ;
        console.log('update开始执行啦！',this.store, this.nodes)
        console.log(Object.values(this.nodes))

        let node;
        let dKey;
        if(this.store.length < 2){
            key+=1;
            this.store.push({
                key,
                children:<Item/>
            })
        }else{
            const x = this.store.pop();
            dKey = x.key;
            // 必须更新之后删除，否则删不掉这个键，只是键值变成null
            // delete this.nodes[dKey];
        }
        this.forceUpdate(()=>{
            if(node) {
                // node.remove();
                delete this.nodes[dKey];

                //通过container子元素我们会发现页面中的元素和我们卸载的node是不同元素
                //其node实际上已经从DOM树里被卸载了
                // console.log(node,this.container);
                // console.dir(this.container);
            }
            // delete this.nodes[x.key];
            // console.log(this.nodes)
        });
    }

    render(){
        console.log(this.store)
        return <div className="destroy-component" ref={container => this.container = container}>
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
