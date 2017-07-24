import React, { Component, PropTypes } from 'react';
import * as mat from 'material-ui';
import { Link } from 'react-router';
import Drawers from '../Drawer/Drawer';
import { connect } from 'react-redux';
import { style } from '../../style';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import ActionHome from 'material-ui/svg-icons/action/home';
import { red500, yellow500, blue500, greenA200 } from 'material-ui/styles/colors';
import AuthMiddleware from '../../store/Middleware/authMiddleware';
import './App.css';

function mapStateToProps(state) {
    return {
        isAuthenticated: state.AuthReducer.isAuthenticated
    }
}

function mapDispatchToProps(dispatch) {
    return {
        logout: () => dispatch(AuthMiddleware.logout()),
        isLoggedin: () => dispatch(AuthMiddleware.isLoggedIn())
    }
}

class Login extends Component {
    static muiName = 'FlatButton';

    render() {
        return (
            <Link to="/login"> <FlatButton {...this.props} label="Login" /></Link>
        );
    }
}


class Logged extends Component {
    constructor(props) {
        super(props);
    }
    handleLogout() {
        this.props.handleLogout();
        console.log("log out Successfull");
    }
    render() {
        return (

            <IconMenu
                iconButtonElement={
                    <IconButton><MoreVertIcon /></IconButton>
                }
                targetOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
            >
                <MenuItem primaryText="Refresh" />
                <MenuItem primaryText="Help" />
                <MenuItem primaryText="Sign out" rightIcon={<ActionHome color={red500} hoverColor={greenA200} />} onTouchTap={this.handleLogout.bind(this)} />
            </IconMenu>

        );
    }
}

Logged.muiName = 'IconMenu';

/**
 * This example is taking advantage of the composability of the `AppBar`
 * to render different components depending on the application state.
 */

class App extends Component {
    constructor() {
        super();
        setTimeout(() => {
            this.props.isLoggedin()
        }, 5)
    }
    // state = {
    //     logged: true,
    // };

    // handleChange = (event, logged) => {
    //     this.setState({ logged: !this.state.logged });
    // };
    static contextTypes = {
        router: PropTypes.object.isRequired
    }
    componentWillReceiveProps(nextProps) {
        setTimeout(() => {
            if (!this.props.isAuthenticated) {
                console.log("signout success");
                this.context.router.push('/login');
            }
        }, 0)
    }
    componentWillMount(){
            if(this.props.isAuthenticated){
                console.log("Authenticated");
            }else{
                console.log("Not Authenticated");
                this.context.router.push('/login');
            }
    }
    render() {
        return (
            <div>
                {/*<Toggle
                    label="Logged"
                    defaultToggled={true}
                    onToggle={this.handleChange}
                    labelPosition="right"
                    style={{ margin: 20 }}
                />*/}

                <mat.AppBar
                    title="Saylani Blood Bank"
                    className="AppBarName"
                    iconElementRight={<Logged handleLogout={this.props.logout} />}
                    iconElementLeft={
                        <Drawers />
                    }

                />
                <h1>Welcome To App Component</h1>
                {this.props.children}
            </div>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);