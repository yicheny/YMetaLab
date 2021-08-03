import React from 'react';
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Menu from "./Menu.jsx";
// import {KeepAliveProvider,KeepAlive} from 'react-keep-router';//发布包测试
import { KeepAlive, KeepAliveProvider } from '../src/index.jsx';//日常修改测试
import CounterView from "./Views/CounterView.jsx";
import PortalTest from "./Views/PortalTest.jsx";
import EffectTest from "./Views/EffectTest.jsx";

// console.log({KeepAliveProvider,KeepAlive})

export default function App() {
    return <Router>
        <KeepAliveProvider>
            <Menu/>
            <Switch>
                <Route path='/app/view1'><CounterView title='view1'/></Route>
                <Route path='/app/portal-test'><PortalTest/></Route>
                <Route path='/app/effect-test'>
                    <KeepAlive cacheKey='/app/effect-test'>
                        <EffectTest/>
                    </KeepAlive>
                </Route>

                <Route path='/app/keep'>
                    <KeepAlive cacheKey='/app/keep'>
                        <CounterView title='keep'/>
                    </KeepAlive>
                </Route>

                <Route>Home</Route>
            </Switch>
        </KeepAliveProvider>
    </Router>
}
