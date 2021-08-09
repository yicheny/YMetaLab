import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Switch, Route, useHistory, useLocation } from "react-router-dom";
import {Markdown} from "y-markdown/lib";
import "./App.scss";
import { Menu, Select } from "./component";

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
    const history = useHistory();
    const location = useLocation();
    const [value,setValue] = useState(location.pathname);

    const options = useMemo(()=>{
        return docs.map(x=>({
            text:x.name,
            value:`/${x.name}`,
        }))
    },[docs])

    useEffect(()=>{
        return history.listen((location)=>{
            setValue(location.pathname)
        });
    },[history]);

    const onChange = useCallback(pathname => history.push(pathname),[history])

    return <div className="app-menu">
        <Select options={options} defaultValue={value} onChange={onChange}/>
        <Menu options={options} value={value} onChange={onChange}/>
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
