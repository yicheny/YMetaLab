import {registeredDemosMenu} from "./registeredDemosMenu";
import styles from './index.module.scss';
import {Switch,Route} from "react-router-dom";
import Home from "./Home";
import CreateCharacter from "./CreateCharacter";
import {Path} from "./constant";

registeredDemosMenu();
export default function Demos() {
    return (<div className={styles.demo}>
        <Switch>
            <Route path={Path.CreateCharacter} component={CreateCharacter}/>
            <Route component={Home}/>
        </Switch>
    </div>)
};
