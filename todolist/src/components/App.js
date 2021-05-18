import React from 'react';
import ToggleInfoCard from "../containers/ToggleInfoCard";
import styles from "./App.module.scss";

function App(props) {
    return <div className={styles.colorBlue}>
        <ToggleInfoCard/>
    </div>
}

export default App;
