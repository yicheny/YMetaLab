import _ from 'lodash';

console.log(_.concat(1,2,2,3,4,4));

// import ReactDOM from 'react-dom';
// ReactDOM.render('demo',document.querySelector('#root'))

/*
import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router,Route,Switch} from "react-router-dom";
import {KeepRoute} from 'react-keep-router';

function App(){
    return <Router>
        <Switch>
            <Route path='/view/1'><View title='view1'/></Route>
            <Route path='/view/2'><View title='view2'/></Route>
            <KeepRoute path='/view/keep'><View title='keep'/></KeepRoute>
            <Route>Home</Route>
        </Switch>
    </Router>
}

ReactDOM.render(App,'rootDOM');

function View(props){
    return <div>
        <h2>标题：{props.title}</h2>
    </div>
}
*/
