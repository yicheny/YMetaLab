import React,{Suspense} from 'react';
import {unstable_createResource} from './magic-cache';
import axios from 'axios';

//相关资料
// https://github.com/facebook/react/issues/14575
// https://github.com/facebook/react/issues/14780

const textResource = unstable_createResource(()=>{
    //res.data.hitokoto
    return new Promise(resolve => {
        axios.get('https://v1.hitokoto.cn/').then(res =>{
            resolve(res.data.hitokoto)
        })
    });
    // return new Promise(resolve => {
    //     setTimeout(()=>{
    //         resolve('mock')
    //     },1000);
    // })
})

function CacheView() {
    return <Suspense fallback={"Loading..."}>
        <AsyncText/>
        <AsyncText/>
        <AsyncText/>
        <AsyncText/>
    </Suspense>
}

export default CacheView;

function AsyncText(){
    const result = textResource.read();
    return <div>
        {result}
    </div>
}
