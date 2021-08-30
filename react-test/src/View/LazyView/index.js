import React, {lazy, Suspense, useState} from 'react';

const LazyTest = lazy(() => import('./LazyTest'));

function LazyView(props) {
    const [open,setOpen] = useState(false);

    return <Suspense fallback={<h2>loading...</h2>}>
        {open && <LazyTest/>}
        <button onClick={()=>setOpen(true)}>打开懒加载组件</button>
    </Suspense>
}

export default LazyView;
