import React from 'react';
import { Switch } from "react-router-dom";
import CounterView from "./CounterView.jsx";
import { KeepRoute } from "../lib";

export default function KeepRouteView() {
    return <Switch>
        <KeepRoute path={`/app/keep-route/1`} component={CounterView}/>
        <KeepRoute path={`/app/keep-route/2`} component={CounterView}/>
        <KeepRoute path={`/app/keep-route/3`} component={CounterView}/>
        <KeepRoute path={`/app/keep-route/4`} component={CounterView}/>


        {/*{
            Array.from(Array(4),(v,k)=>{
                return <KeepRoute path={`/app/keep-route/${k+1}`} component={CounterView} key={k}/>
            })
        }*/}
    </Switch>
};
