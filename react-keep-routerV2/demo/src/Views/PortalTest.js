import React, { useEffect, useMemo } from 'react';
import {createPortal} from "react-dom";
import CounterView from "./CounterView.js";

export default function PortalTest() {
    return <Portal>
        <CounterView title='portal-test'/>
    </Portal>;
};

function Portal(props){
    return createPortal(props.children,useContainer());
}

function useContainer(className = 'portal-container'){
    const container = useMemo(()=>{
        const dom = document.createElement('div');
        dom.className = className;
        dom.display = 'none';
        return dom;
    },[className])

    useEffect(()=>{
        document.body.appendChild(container);
        return () => document.body.removeChild(container);
    },[container])

    return container;
}
