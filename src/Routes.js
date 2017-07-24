import React, { Component } from 'react';
import App from './components/App/App';
import DonnerDetail from './components/DonnerDetail/DonnerDetail';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Login from './containers/Auth/Login/Login';
import Signup from './containers/Auth/Signup/Signup';
import {
    Router,
    Route,
    IndexRoute,
    browserHistory
} from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

class Routes extends Component {
    render() {
        return (
            <MuiThemeProvider>
                <Router history={browserHistory}>
                    <Route path="login" component={Login}/>
                    <Route path="signup" component={Signup}/>
                    <Route path="/" component={App} >
                        <Route path="donnerDetail" component={DonnerDetail} />
                    </Route>
                </Router>
            </MuiThemeProvider>
        );
    }
}
export default Routes;