import {registeredDemosMenu} from "./registeredDemosMenu";
import styles from './index.module.scss';

registeredDemosMenu();
export default function Demos() {
    return (<div className={styles.demo}>
        Demos
    </div>)
};
