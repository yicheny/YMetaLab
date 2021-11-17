import React, { useMemo,useEffect } from 'react';
import { Route } from 'react-router-dom';
// import KeepAlive from "./KeepAlive/KeepAlive.jsx";
import KeepAliveR from "./KeepAlive/KeepAliveR.jsx";
import utils from './KeepAlive/utils';

function KeepRoute({ children, component, path, ...rest }) {
    return <Route path={ path } { ...rest }>
        <KeepAliveR cacheKey={ path }>
            {useRender(component,children)}
        </KeepAliveR>
    </Route>
}

export default React.memo(KeepRoute);

function useRender(component,children){
    return useMemo(()=>{
        // console.log('useRender')
        return utils.isUndefined(children)
            ? (
                utils.isUndefined(component)
                    ? component
                    : React.createElement(component)
            )
            : children
    },[])
}


