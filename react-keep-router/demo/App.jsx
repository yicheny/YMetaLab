import React from 'react';
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Menu from "./Menu.jsx";
// import {KeepAliveScope,KeepAlive} from 'react-keep-router';//发布包测试
import { KeepAlive, KeepAliveScope } from '../src';//日常修改测试
import CounterView from "./Views/CounterView.jsx";
import PortalTest from "./Views/PortalTest.jsx";
import EffectTest from "./Views/EffectTest.jsx";
import ContextTest from "./Views/ContextTest.jsx";

// console.log({KeepAliveScope,KeepAlive})

export default function App() {
    return <Router>
        <KeepAliveScope>
            <Menu/>
            <Switch>
                <Route path='/app/view1'><CounterView title='view1'/></Route>
                <Route path='/app/portal-test'><PortalTest/></Route>
                <Route path='/app/effect-test'>
                    <KeepAlive cacheKey='/app/effect-test'>
                        <EffectTest/>
                    </KeepAlive>
                </Route>
                <Route path='/app/many-component-test'>
                    <KeepAlive cacheKey='/app/many-component-test'>
                        <EffectTest/>
                        <EffectTest/>
                        <EffectTest/>
                    </KeepAlive>
                </Route>
                <Route path='/app/context-test' component={ContextTest}/>

                <Route path='/app/keep'>
                    <KeepAlive cacheKey='/app/keep'>
                        <CounterView title='keep'/>
                    </KeepAlive>
                </Route>

                <Route>Home</Route>
            </Switch>
        </KeepAliveScope>
    </Router>
}
