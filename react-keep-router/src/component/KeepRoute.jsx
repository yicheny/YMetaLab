import {Route} from 'react-router-dom';
import routeCache from "./RouteCaChe";

export default class KeepRoute extends Route{
    componentDidMount(){

    }

    componentWillUnmount(){

    }

    render(){
        return <Route {...this.props}/>
    }
}
