import {Switch,Route} from "react-router-dom";
import SuspenseView from "./View/SuspenseView";
import CacheView from "./View/CacheView";
import ErrorBoundaryView from "./View/ErrorBoundaryView";

function App() {
  return <div className="app">
    <Switch>
      <Route path='/suspense' component={SuspenseView}/>
      <Route path='/cache' component={CacheView}/>
      <Route path='/error-boundary' component={ErrorBoundaryView}/>
      <Route component={SuspenseView}/>
    </Switch>
  </div>
}

export default App;
