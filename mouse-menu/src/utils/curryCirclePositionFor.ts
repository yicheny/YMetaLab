import {IPositionConfig} from "../base";
import {useMemo} from "react";

export function curryGetCirclePosition(infos?:IPositionConfig) {
    const {boxWidth=300,boxHeight=300,itemWidth=60,itemHeight=60} = infos || {};

    return (count:number,currentIndex:number) => {
        const rad = ((currentIndex % count) / (count / 2)) * Math.PI;
        const sinValue:number = Number(Math.sin(rad).toFixed(4));
        const cosValue:number = Number(Math.cos(rad).toFixed(4));
        const height = (boxHeight - itemHeight) / 2;
        const width = (boxWidth - itemWidth) / 2;
        const bottom = (cosValue * height) + height;
        const left = (sinValue * width) + width;
        return {
            bottom:bottom.toFixed(4),
            left:left.toFixed(4)
        };
    }
}

export function useGetCirclePosition(infos:IPositionConfig ){
    return useMemo(()=>curryGetCirclePosition(infos),[infos]);
}
