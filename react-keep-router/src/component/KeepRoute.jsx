import React, { useMemo } from 'react';
import { Route } from 'react-router-dom';
import KeepAlive from "./KeepAlive/KeepAlive.jsx";
import utils from './KeepAlive/utils';
// import routeCache from "./RouteCaChe";

function KeepRoute({ children, component, path, ...rest }) {
    return <Route path={ path } { ...rest }>
        <KeepAlive cacheKey={ path }>
            {useRender(component,children)}
        </KeepAlive>
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
