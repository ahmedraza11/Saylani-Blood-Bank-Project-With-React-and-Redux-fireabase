import React from 'react';
import Drawer from 'material-ui/Drawer';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import MdMenu from 'react-icons/lib/md/menu';
import Avatar from 'material-ui/Avatar';
import { style } from '../../style';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import * as firebase from 'firebase';
import * as mat from 'material-ui';
import './Drawer.css';

function mapStateToProps(state) {
    return {
        authUser: state.AuthReducer.authUser,
        donorDetail: state.DonorReducer.donorDetail
    }
}
class Drawers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            userPro: this.props.authUser
        };

    }
    componentWillMount() {
        console.log("pora user /........", this.props.authUser);
    }
    handleToggle = () => this.setState({ open: !this.state.open });

    handleClose = () => this.setState({ open: false });

    render() {

        return (
            <div>
                <IconButton
                    iconClassName="muidocs-icon-custom-github"
                    onTouchTap={this.handleToggle}
                    className="AppBarName"
                >
                </IconButton>
                <MdMenu onClick={this.handleToggle} style={style.MdMenu} />
                <Drawer
                    docked={false}
                    width={300}
                    open={this.state.open}
                    onRequestChange={(open) => this.setState({ open })}
                >
                    <mat.AppBar style={style.AppBar} onTouchTap={this.handleClose} title="Dashboard" />
                    <div className="navigation-avatar-div">
                        <Avatar src={(!this.state.userPro.photoURL == "") ? this.state.userPro.photoURL : "https://cdn0.iconfinder.com/data/icons/PRACTIKA/256/user.png"}
                            size={80}
                            className="navigation-icon"
                        />
                        <span className="navigation-span">{this.props.authUser.fullName}</span>
                    </div>
                    <Link to="/donorList"><MenuItem>Donors</MenuItem></Link>
                    <Link to="/donorList"><MenuItem>Notifications</MenuItem></Link>
                    {(this.props.donorDetail.isDonor)?<Link to="/registerDonor"> <MenuItem>Register as Donor</MenuItem></Link>:null}
                    <Link to="/donorList"><MenuItem>Settings</MenuItem></Link>
                    <MenuItem>Update Info</MenuItem>
                </Drawer>
            </div>
        );
    }
}

export default connect(mapStateToProps)(Drawers)