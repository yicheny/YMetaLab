//import init from './init';
// import React from 'react';
// import ReactDOM from 'react-dom';
// ReactDOM.render(<div>Demo</div>,document.querySelector('#root'));

import init from './init';
import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router,Route,Switch} from "react-router-dom";
// import {KeepRoute} from 'react-keep-router';

ReactDOM.render(<App/>,document.querySelector('#root'));

function App(){
    return <Router>
        <Switch>
            <Route path='/view/1'><View title='view1'/></Route>
            <Route path='/view/2'><View title='view2'/></Route>
            <Route path='/view/keep'><View title='keep'/></Route>
            <Route>Home</Route>
        </Switch>
    </Router>
}

function View(props){
    return <div>
        <h2>标题：{props.title}</h2>
    </div>
}
