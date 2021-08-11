import React, { useCallback, useEffect, useMemo, useState, Fragment } from 'react';
import { Switch, Route, useHistory, useLocation } from "react-router-dom";
import { Markdown } from "y-markdown/lib";
import "./App.scss";
import { Anchor, Menu, Select } from "./component";

const { docs } = require("./doc.json");
const readDoc = require.context('./doc', false, /.md$/);//注：这个路径必须是写死的

// console.log(require('../../react-keep-router/README.md'));
// const readExtraDoc = require.context('../../react-keep-router',false,/.md$/);
// const extraDoc = readExtraDoc('./README.md');
// console.log('extraDoc',extraDoc)

function App() {
    return <div className="app">
        <MenuArea/>
        <Content/>
    </div>
}

export default App;

function MenuArea() {
    const history = useHistory();
    const location = useLocation();
    const [value, setValue] = useState(location.pathname);

    const options = useMemo(() => {
        return docs
            .map(x => ({
                text: x.name,
                value: `/${ x.name }`,
            }))
            // .concat(Array.from(Array(100), (x, i) => ({ text: i + 4, value: Math.random() })))
    }, [docs])

    useEffect(() => {
        return history.listen((location) => {
            setValue(location.pathname)
        });
    }, [history]);

    const onChange = useCallback(pathname => history.push(pathname), [history])

    return <div className="app-menu">
        <Select options={ options } defaultValue={ value } onChange={ onChange }/>
        <Menu options={ options } value={ value } onChange={ onChange }/>
    </div>
}

function Content() {
    return <div className="app-content">
        <Switch>
            {
                docs.map(doc => {
                    return <Route path={ `/${ doc.name }` } key={ doc.name }>
                        <View docPath={ doc.path }/>
                    </Route>
                })
            }
        </Switch>
    </div>
}

function View({ docPath }) {
    const [anchorOption, setAnchorOption] = useState();

    const handleMarked = useCallback((html) => {
        setAnchorOption(execHeader(html));

        function execHeader(html) {
            const anchorOptions = [];
            const reg = /<(h[1-6]+).+id="(.+)">(.+)<\/\1>/g;
            let execResult = reg.exec(html);

            while ( execResult ) {
                const option = {
                    level: execResult[ 1 ].slice(-1) - 1,
                    id: execResult[ 2 ],
                    text: execResult[ 3 ].replace(/<code>|<\/code>/g, '')
                };
                anchorOptions.push(option);
                execResult = reg.exec(html)
            }

            return anchorOptions;
        }
    }, [])

    return <Fragment>
        <Markdown onMarked={ handleMarked }>
            { readDoc(docPath).default }
        </Markdown>
        <Anchor options={ anchorOption }/>
    </Fragment>;
}

