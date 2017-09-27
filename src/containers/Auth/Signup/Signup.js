import React, { Component, PropTypes } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AuthMiddleware from '../../../store/Middleware/authMiddleware';
import CircularProgress from 'material-ui/CircularProgress'
import SweetAlert from 'sweetalert-react';
import Webcam from 'react-webcam';
import * as MUI from 'material-ui';
import './Signup.css';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { style } from '../../../style.js';
import { Button, Dimmer, Loader, Image, Segment } from 'semantic-ui-react';

function mapStateToProps(state) {
    return {
        isRegisterd: state.AuthReducer.isRegisterd,
        isProcessing: state.AuthReducer.isProcessing,
        isRegistered: state.AuthReducer.isRegistered,
        errorMessage: state.AuthReducer.errorMessage,
        isError: state.AuthReducer.isError,

    };
}
function mapDispatchToProps(dispatch) {
    return {
        signup: (credentials) => dispatch(AuthMiddleware.signup(credentials))
    }
}

class Signup extends Component {
    setRef = (webcam) => {
        this.webcam = webcam;
    }
    static contextTypes = {
        router: PropTypes.object.isRequired
    }
    constructor() {
        super();
        this.state = {
            file: '',
            ImagePreviewer: '',
            capture: false,
            screenShot: null,
            captured: false,
            webcam: false,
            webcamSrc: null,
            show: false
        }
        this.handleSignup = this.handleSignup.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);
    }
    handleSubmit(e) {
        e.preventDefault();

    }
    handleCapture() {
        var screenShot = this.webcam.getScreenshot();
        // var uploadSrc = screenShot.slice(22, 200000);
        console.log("captured Screeshot==================", screenShot);
        this.setState({
            screenShot: screenShot,
            file: screenShot,
            captured: true,
            capture: false,
            webcam: true,
            webcamSrc: screenShot
        })
        this.refs.file = "";
    }
    handleCamera() {
        this.setState({
            capture: !this.state.capture,
            file: null
        })
    }
    handleImageChange(e) {
        e.preventDefault();
        var reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
            this.setState({
                webcam: false,
                file: file,
                captured: false,
                ImagePreviewer: reader.result
            });
        }
        reader.readAsDataURL(file);
        console.log("file //////", this.state.file);
    }
    handleSignup() {

        var userData = {
            email: this.refs.email.getValue(),
            password: this.refs.password.getValue(),
            fullName: this.refs.fullName.getValue(),
            profilePic: this.state.file,
            webcam: this.state.webcam

        }
        console.log("current value in File State==============", this.state.file)
        console.log("Sigup Webcam -------------", this.state.webcam)
        this.props.signup(userData, this.state.webcam, this.state.file);
    }
    componentWillReceiveProps(nextProps) {
        console.log("isRegisterd", nextProps);
        setTimeout(() => {
            if (this.props.isRegistered) {
                console.log("isRegistered is True in SignUp");
                this.context.router.push("/login");
            } 
        }, 0);
    }
    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <div className="signup-loginContainer">
                        <h3>Signup Form</h3>
                        <MUI.Divider />
                        <MUI.Paper className="signup-paper">
                            <form>
                                <MUI.TextField
                                    ref="fullName"
                                    hintText="Full Name"
                                    floatingLabelText="Full Name"
                                    fullWidth={true}
                                />
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
                                    <MUI.Paper
                                        style={style.PhotoViewer}
                                        zDepth={1}
                                        rounded={false}
                                    >
                                        {(this.state.capture) ?
                                            (<div>
                                                <Webcam
                                                    audio={false}
                                                    ref={this.setRef}
                                                    height={130}
                                                    width={130}
                                                />
                                            </div>) :
                                            <img width="130" height="130" src={(this.state.captured) ? this.state.screenShot : (!this.state.ImagePreviewer == "") ? this.state.ImagePreviewer : null} style={style.ImagePre} alt="Image Not Found" />
                                        }
                                    </MUI.Paper>
                                    <MUI.RaisedButton
                                        label={(this.state.capture) ? "Capture" : "Take a Capture"}
                                        primary={true}
                                        onTouchTap={(this.state.capture) ? this.handleCapture.bind(this) : this.handleCamera.bind(this)}
                                    />
                                    <MUI.TextField
                                        ref="file"
                                        fullWidth={true}
                                        type="file"
                                        isRequired="isRequired"
                                        text="Upload Your Photo"
                                        onChange={this.handleImageChange}
                                    />
                                </div>
                                <div>
                                    <MUI.RaisedButton
                                        label={(this.props.isProcessing) ? <CircularProgress color="white" size={28} thickness={3} /> : "Signup"}
                                        primary={true}
                                        className="signup-loginBtn"
                                        onTouchTap={this.handleSignup}
                                    />
                                </div>
                            </form>

                            {/* <SweetAlert
                                show={this.state.show}
                                title="Signup Failed"
                                text={this.props.errorMessage}
                                onConfirm={() => {
                                    this.setState({ show: false })
                                }}
                            /> */}

                        </MUI.Paper>
                        <Dimmer active={this.props.isProcessing} inverted page>
                            <Loader size='medium'>Creating User</Loader>
                        </Dimmer>
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);