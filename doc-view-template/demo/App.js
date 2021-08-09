import React from 'react';
import {Switch,Route} from "react-router-dom";
import {Markdown} from "y-markdown/lib";
import "./App.scss";
import { Menu } from "./component";

const readDoc = require.context('./doc', false, /.md$/);
const { docs } = require("./doc.json");

function App() {
    return <div className="app">
        <MenuArea/>
        <Content/>
    </div>
}

export default App;

function MenuArea(){
    return <div className="app-menu">
        <Menu option={getMenuOption(docs)}/>

    </div>
}

function Content(){
    return <div className="app-content">
        <Switch>
            {
                docs.map(doc => {
                    return <Route path={`/${doc.name}`} key={doc.name}>
                        <MarkdownBox docPath={doc.path}/>
                    </Route>
                })
            }
        </Switch>
    </div>
}

function MarkdownBox({docPath}){
    return <Markdown>
        {readDoc(docPath).default}
    </Markdown>;
}

function getMenuOption(docs){
    return docs.map(x=>({
        text:x.name,
        to:`/${x.name}`
    }))
}
