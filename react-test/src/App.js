import {Switch,Route} from "react-router-dom";
import SuspenseView from "./View/SuspenseView";

function App() {
  return <div className="app">
    <Switch>
      <Route path='/suspense' component={SuspenseView}/>
      <Route component={SuspenseView}/>
    </Switch>
  </div>
}

export default App;
