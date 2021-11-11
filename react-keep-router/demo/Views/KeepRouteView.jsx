import React from 'react';
import { Switch } from "react-router-dom";
import CounterView from "./CounterView.jsx";
import { KeepRoute } from "../../src";

export default function KeepRouteView() {
    return <Switch>
        {
            Array.from(Array(4),(v,k)=>{
                return <KeepRoute path={`/app/keep-route/${k+1}`} component={CounterView} key={k}/>
            })
        }
    </Switch>
};
