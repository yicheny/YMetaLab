import React from 'react';
import {Route} from 'react-router-dom';
import KeepAlive from "./KeepAlive/KeepAlive.jsx";
// import routeCache from "./RouteCaChe";

export default function KeepRoute({component,path,...rest}){
    const Component = component;
    return <Route path={path} {...rest}>
        <KeepAlive cacheKey={path}>
            <Component/>
        </KeepAlive>
    </Route>
}
