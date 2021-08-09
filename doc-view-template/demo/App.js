import React from 'react';
import {Markdown} from "y-markdown/lib";
import "./App.scss";

const readDoc = require.context('./doc', false, /.md$/);
const docData = require("./doc.json").docs;

function App() {
    return <div className="app">
        <Markdown>
            {readDoc(docData[1].path).default}
        </Markdown>
    </div>
}

export default App;
