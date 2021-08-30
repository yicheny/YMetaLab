import React, {Suspense} from 'react';
import {doFetch} from "./fetchApi";

//测试Suspense组件
//官方示例：https://codesandbox.io/s/frosty-hermann-bztrp?file=/src/fakeApi.js

function SuspenseView() {
    return (<div>
        <div>SuspenseView</div>
        <Suspense fallback={<h1>Table Loading...</h1>}>
            <Box>
                <Box>
                    <Table/>
                </Box>
            </Box>
        </Suspense>
        <Suspense fallback={<h1>Card Loading...</h1>}>
            <Card/>
        </Suspense>
    </div>);
}

export default SuspenseView;

const cardFetch = doFetch('card')
function Card(){
    //const data = doFetch('card').read();//这种写法会一直loading
    const data = cardFetch.read();
    return <div>
        card：{data.info}
    </div>
}

const tableFetch = doFetch('table',1000)
function Table(){
    const data = tableFetch.read();
    return <div>
        table：{data.info}
    </div>
}

function Box(props){
    return <div>
        box：{props.children}
    </div>
}
