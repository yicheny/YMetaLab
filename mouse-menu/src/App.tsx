import React from 'react';
import CircleMenu from "./component/CircleMenu";
import styles from './App.module.scss'

const items = Array.from(Array(6),(x,i)=>{
    return {
        children:i,
        onClick:()=>console.log(i),
        className:styles.menuItem
    }
})

const positionOptions = {
    boxWidth:300,
    boxHeight:300,
    itemSize:60,
}

function App() {
    return (
        <div className="App">
            <CircleMenu items={items} positionOptions={positionOptions}/>
        </div>
    );
}

export default App;
