import {curryGetCirclePosition} from "./curryCirclePositionFor";

describe('curryCirclePositionFor测试',()=>{
    it('基本测试',()=>{
        const circlePositionFor = curryGetCirclePosition();
        const infos = Array.from(Array(6),(x,i)=>circlePositionFor(6,i));
        console.log('infos',infos)
    })
})
