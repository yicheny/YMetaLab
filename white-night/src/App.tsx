import {useHistory} from 'react-router-dom';
import styles from './App.module.scss';
import Button from "./components/Button";

function App() {
  const history = useHistory();

  return <div className={styles.app}>
    <div className={styles.menu}>
      <Button>开始游戏</Button>
      <Button>载入游戏</Button>
      <Button onClick={()=>history.push("/demo")}>组件测试</Button>
    </div>
  </div>
}

export default App;
