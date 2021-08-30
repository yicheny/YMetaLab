import React from 'react';
import _ from 'lodash'

function LazyTest(props) {
    return (<div>
        TestLazy：{_.random(100)}
        </div>);
}

export default LazyTest;
