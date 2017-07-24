import React, { Component, PropTypes } from 'react';
import * as MUI from 'material-ui';
import { Link } from 'react-router';

class RegisterDonor extends Component {
    static contextTypes = {
        router: PropTypes.object.isRequired
    }

    constructor(props) {
        supert();
        console.log("RegisterDonor Component Props,===", props);
        this.state = {
            fullName: '',
            address: '',
            contact: '',
            bloodGroupValue: '',
            dateOfBirth: new Date(),
        };
    }
    handleChange = (event, index, value) => this.setState({ bloodGroupValue: value });

    handleChangeInput(e) {
        this.setState({ [e.target.name]: e.target.value });
        console.log("E ", e);
        //console.log("B ",b);
        //console.log("C ",c);
    }
    handleChangeInDate(e, newDate) {
        this.setState({ dateOfBirth: newDate });
    }
    handleSave() {
        this.props.registerDonor(
            {
                uid: this.props.authUser.uid,
                isDonor: true,
                fullName: this.refs.fullName.getValue(),
                address: this.refs.address.getValue(),
                contactNo: this.refs.contactNo.getValue(),
                bloodGroup: this.refs.bloodGroup.getValue(),
                dateOfBirth: this.refs.dateOfBirth.state.date.getTime(),
            }
        );
    }

    componentWillMount() {
        this.setState({
            bloodGroup: this.props.authUser.bloodGroup,
            fullName: this.props.authUser.fullName,
            address: this.props.authUser.address,
            contactNo: this.props.authUser.contactNo,
            dateOfBirth: this.props.authUser.dateOfBirth ? new Date(this.props.authUser.dateOfBirth) : new Date(),

        });

    }
    componentWillReceiveProps(){
        setTimeout(()=>{
            if(this.props.isDetailUpdated){
                console.log("DetailUpdated True");
                this.context.router.push("/dashboard");
            }
        },0);
    }


render() {
    return (
        <div>
            <MUI.Paper/>
            
        </div>      
    );
}
}