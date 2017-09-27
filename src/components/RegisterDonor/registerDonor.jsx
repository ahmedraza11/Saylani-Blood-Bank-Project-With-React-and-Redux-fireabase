import React, { Component, PropTypes } from 'react';
import styles from './registerDonorStyle';
import * as MUI from 'material-ui';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import data from '../../data.json';
import DonorMiddleware from '../../store/Middleware/donorMiddleware';

function mapStateToProps(state) {
    return {
        authUser: state.AuthReducer.authUser,
        isAuthenticated: state.AuthReducer.isAuthenticated,
        donorList: state.DonorReducer.donorList,
        donorDetail: state.DonorReducer.donorDetail,
        isDetailUpdated: state.DonorReducer.isDetailUpdated
    }
}
function mapDispatchToProps(dispatch) {
    return {
        registerDonor: (donorDetail) => dispatch(DonorMiddleware.registerDonor(donorDetail))
    }
}

class RegisterDonor extends Component {

    static contextTypes = {
        router: PropTypes.object.isRequired
    }

    constructor(props) {
        super();
        console.log("Component props ", props);

        ///State initaliazing
        this.state = {
            bloodGroupValue: "",
            fullName: "",
            address: "",
            contactNo: "",
            dateOfBirth: new Date(),
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleChangeInput = this.handleChangeInput.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleChangeInDate = this.handleChangeInDate.bind(this);
    }

    handleChange = (event, index, value) => this.setState({ bloodGroupValue: value });

    handleChangeInput(e) {
        this.setState({ [e.target.name]: e.target.value });
        console.log("E==================== ", e);
    }

    handleChangeInDate(e, newDate) {
        this.setState({ dateOfBirth: newDate });
    }

    handleSave() {
        this.props.registerDonor
            (
            {
                uid: this.props.authUser.uid,
                isDonor: true,
                fullName: this.refs.fullName.getValue(),
                address: this.refs.address.getValue(),
                contactNo: this.refs.contactNo.getValue(),
                bloodGroup: this.refs.bloodGroup.props.value,
                dateOfBirth: this.refs.dateOfBirth.state.date.getTime(),
            }
            );
    }

    componentWillMount() {
        this.setState
            (
            {
                bloodGroupValue: this.props.authUser.bloodGroup,
                fullName: this.props.authUser.fullName,
                address: this.props.authUser.address,
                contactNo: this.props.authUser.contactNo,
                dateOfBirth: this.props.authUser.dateOfBirth ? new Date(this.props.authUser.dateOfBirth) : new Date(),
            }
            );
    }

    componentWillReceiveProps(nextProps) {
        setTimeout(() => {
            if (this.props.isDetailUpdated) {
                console.log("isDetailUpdated true");
                this.context.router.push("/");
            }
        }, 0)
    }





    render() {
        return (
            <div style={styles.registerDonorContainer}>
                <MUI.Paper>
                    <h3>Donor Registeration</h3>
                    <MUI.Divider />
                    <form>
                        <MUI.TextField
                            ref="fullName"
                            name="fullName"
                            hintText="Full Name"
                            floatingLabelText="Full Name"
                            value={this.state.fullName}
                            onChange={this.handleChangeInput}
                            fullWidth={true}
                        />
                        <MUI.TextField
                            ref="address"
                            name="address"
                            hintText="Address"
                            floatingLabelText="Address"
                            value={this.state.address}
                            onChange={this.handleChangeInput}
                            fullWidth={true}
                        />
                        <MUI.TextField
                            ref="contactNo"
                            name="contactNo"
                            hintText="Contact No"
                            floatingLabelText="Contact No"
                            value={this.state.contactNo}
                            onChange={this.handleChangeInput}
                            fullWidth={true}
                        />
                        <MUI.SelectField
                            ref="bloodGroup"
                            floatingLabelText="Blood Group"
                            value={this.state.bloodGroupValue}
                            fullWidth={true}
                            autoWidth={true}
                            onChange={this.handleChange}
                        >
                            {
                                data.bloodgroups.map(bloodgroup => {
                                    return <MUI.MenuItem key={bloodgroup} value={bloodgroup} primaryText={bloodgroup} />
                                })
                            }
                        </MUI.SelectField>

                        <MUI.DatePicker
                            ref="dateOfBirth"
                            hintText="Date of Birth"
                            floatingLabelText="Date of Birth"
                            value={this.state.dateOfBirth}
                            onChange={this.handleChangeInDate}
                            fullWidth={true}
                        />
                        <div style={styles.buttons}>
                            <Link to="/">
                                <MUI.RaisedButton label="Cancel" />
                            </Link>
                            <MUI.RaisedButton label="Save"
                                style={styles.saveButton}
                                onTouchTap={this.handleSave}
                                primary={true}
                            />
                        </div>
                    </form>
                    <div style={styles.clear} />
                </MUI.Paper>
            </div>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(RegisterDonor);