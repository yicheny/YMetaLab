import React from 'react';
import clsx from 'clsx';
import {IPositionConfig} from "../base";
import styles from "./CircleMenu.module.scss";
import {useGetCirclePosition} from "../utils";

interface IItemOption{
    className?: string,
    style?: React.CSSProperties | undefined,
    onClick?: React.MouseEventHandler<HTMLSpanElement> | undefined,
    children: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined
}

interface ICircleMenuProps{
    className?: string,
    style?: React.CSSProperties | undefined,
    positionOptions?: IPositionConfig,
    items: IItemOption[]
}

export default function CircleMenu(props:ICircleMenuProps){
    const {boxWidth=300,boxHeight=300,itemWidth=60,itemHeight=60,itemSize} = props.positionOptions || {};
    const getCirclePosition = useGetCirclePosition({
        boxWidth,
        boxHeight,
        itemHeight:itemSize||itemHeight,
        itemWidth:itemSize||itemWidth
    });
    const count = props.items.length;
    return <div className={clsx(styles.circleMenu,props.className)}
                style={Object.assign({width:boxWidth,height:boxHeight},props.style)}>
        {
            props.items.map((x,i)=>{
                const positionInfo = getCirclePosition(count,i);
                const baseStyle = {
                    width:itemWidth,
                    height:itemHeight,
                    bottom:positionInfo.bottom.concat('px'),
                    left:positionInfo.left.concat('px'),
                };

                return <div key={i}
                            style={Object.assign(baseStyle,x.style)}
                            onClick={x.onClick}
                            className={clsx(styles.item,x.className)}>
                    {x.children}
                </div>
            })
        }
    </div>
}
