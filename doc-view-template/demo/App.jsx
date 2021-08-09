import React from 'react';
import {Markdown} from "y-markdown/lib";
import "./App.scss"

function App() {
    return <div className="app">
        <Markdown>
            {require('./doc/test-doc.md').default}
        </Markdown>
    </div>
}

export default App;
