import {registeredDemosMenu} from "./registeredDemosMenu";
import styles from './index.module.scss';
import Button from "../components/Button";

registeredDemosMenu();
export default function Demos() {
    return (<div className={styles.demo}>
        <Button>Button</Button>
    </div>)
};
