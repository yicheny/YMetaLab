import React, { useMemo } from 'react';
import { Route } from 'react-router-dom';
import { KeepAlive } from "../../dist";

export * from '../../dist'

export function KeepRoute({ children, component, path, ...rest }) {
  return <Route path={ path } { ...rest }>
    <KeepAlive name={ path }>
      {useRender(component,children)}
    </KeepAlive>
  </Route>
}

export default React.memo(KeepRoute);

function useRender(component,children){
  return useMemo(()=>{
    // console.log('useRender')
    return isUndefined(children)
      ? (
        isUndefined(component)
          ? component
          : React.createElement(component)
      )
      : children
  },[])
}

function isUndefined(x){
  return typeof x === 'undefined';
}
