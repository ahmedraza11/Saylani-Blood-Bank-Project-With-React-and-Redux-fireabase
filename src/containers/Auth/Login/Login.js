import React, { Component, PropTypes } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as MUI from 'material-ui'
import { Link } from 'react-router';
import { connect } from 'react-redux';
import Help from 'material-ui/svg-icons/action/help';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import './Login.css';
import { grey500 } from 'material-ui/styles/colors';
import AuthMiddleware from '../../../store/Middleware/authMiddleware';
import CircularProgress from 'material-ui/CircularProgress'
function mapStateToProps(state) {
    return {
        isAuthenticated: state.AuthReducer.isAuthenticated,
        isProcessing: state.AuthReducer.isProcessing
    }
}
function mapDispatchToProps(dispatch) {
    return {
        sigin: (credentials) => dispatch(AuthMiddleware.signin(credentials))
    };
}
class Login extends Component {
    static contextTypes = {
        router: PropTypes.object.isRequired
    }
    constructor() {
        super();
        this.handleSign = this.handleSign.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        setTimeout(() => {
            if (this.props.isAuthenticated){
                console.log("user is Authenticated");
                this.context.router.push('/');
            }
        }, 0)
    }
    handleSign() {
        this.props.sigin({
            "email": this.refs.email.getValue(),
            "password": this.refs.password.getValue()
        })
    }
    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <div className="long-loginContainer">
                        <MUI.Paper className="long-paper">
                            <form>
                                <MUI.TextField
                                    ref="email"
                                    hintText="E-mail"
                                    floatingLabelText="E-mail"
                                    fullWidth={true}
                                />
                                <MUI.TextField
                                    ref="password"
                                    hintText="Password"
                                    floatingLabelText="Password"
                                    fullWidth={true}
                                    type="password"
                                />
                                <div>
                                    <MUI.Checkbox
                                        label="Remember me"
                                        className="long-checkRemember"
                                        lableStyle={{ color: grey500 }}
                                        iconStyle={{ color: grey500, borderColor: grey500, fill: grey500 }}
                                    />
                                   
                                     <MUI.RaisedButton
                                        label={(this.props.isProcessing)?<CircularProgress color="white" size={28} thickness={3} />:"Login"}
                                        primary={true}
                                        className="long-loginBtn"
                                        onTouchTap={this.handleSign}
                                    />
                                   
                                </div>
                            </form>
                        </MUI.Paper>
                        <div className="long-buttonsDiv">
                            <Link to="/signup">
                                <MUI.FlatButton
                                    label="Register"
                                    className="long-flatButton"
                                    icon={<PersonAdd />}
                                />
                            </Link>
                        </div>
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);