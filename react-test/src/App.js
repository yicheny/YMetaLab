import {Switch,Route} from "react-router-dom";
import SuspenseView from "./View/SuspenseView";
import CacheView from "./View/CacheView";

function App() {
  return <div className="app">
    <Switch>
      <Route path='/suspense' component={SuspenseView}/>
      <Route path='/context-cache' component={CacheView}/>
      <Route component={SuspenseView}/>
    </Switch>
  </div>
}

export default App;
