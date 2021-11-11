import React from 'react';
import { Route } from 'react-router-dom';
import KeepAlive from "./KeepAlive/KeepAlive.jsx";
import utils from './KeepAlive/utils';
// import routeCache from "./RouteCaChe";

export default function KeepRoute({ children, component, path, ...rest }) {
    const Component = component;
    return <Route path={ path } { ...rest }>
        <KeepAlive cacheKey={ path }>
            {
                utils.isUndefined(children)
                    ? (
                        utils.isUndefined(Component)
                            ? Component
                            : <Component/>
                    )
                    : children
            }
        </KeepAlive>
    </Route>
}
