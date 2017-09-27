import React, { Component } from 'react';
import App from './components/App/App';
import NotFound from './components/notFound/NotFound';
import DonorDetail from './components/DonerDetail/donerDetail';
import DonorList from './components/DonorList/donorList';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Login from './containers/Auth/Login/Login';
import Signup from './containers/Auth/Signup/Signup';
import Dashboard from './containers/Dashboard/Dashboard';
import RegisterDonor from './components/RegisterDonor/registerDonor.jsx';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

class Routes extends Component {
    render() {
        return (
            <MuiThemeProvider>
                <Router history={browserHistory}>
                    <Route path="/" component={App} >   
                        <IndexRoute component={Dashboard} />
                        <Route path="/donorList/:id" component={DonorDetail} />
                        <Route path="/donorList" component={DonorList} />
                        <Route path="/registerDonor" component={RegisterDonor} />

                    </Route>
                    <Route path="/login" component={Login} />
                    <Route path="/signup" component={Signup} />
                    <Route path="*" component={NotFound} />
                </Router>

            </MuiThemeProvider>
        );
    }
}
export default Routes;