import React, { Component, PropTypes } from 'react';
import * as MUI from 'material-ui';
import styles from './donorListStyle';
import { connect } from 'react-redux';
import ActionInfo from 'material-ui/svg-icons/action/info';
import Person from 'material-ui/svg-icons/social/person';
import DonorMiddleware from '../../store/Middleware/donorMiddleware';
import { Card, Icon, Button, Dimmer, Loader, Header, Image, Segment } from 'semantic-ui-react'
import data from '../../data.json';

function mapStateToProps(state) {
    return {
        isAuthenticated: state.AuthReducer.isAuthenticated,
        authUser: state.AuthReducer.authUser,
        donorList: state.DonorReducer.donorList,
        isProcessing: state.DonorReducer.isProcessing
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getDonorList: (bloodGroup) => dispatch(DonorMiddleware.getDonorList(bloodGroup)),
    }
}

class DonorList extends Component {
    static contextTypes = {
        router: PropTypes.object.isRequired
    }
    constructor() {
        super();
        this.state = {
            bloodgroup: ''
        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleListItemClick = (id) => this.context.router.push("/donorList/" + id);

    listDonors() {
        console.log("Dashboard Props ...=======================... ", this.props);

        console.log("List Donors");
        var listItems = this.props.donorList
            .filter((donor => donor.uid !== this.props.authUser.uid))
            .map(donor => {
                console.log("Donor item ", donor);
                return (<div key={donor.uid}>
                    <MUI.ListItem
                        leftAvatar={<MUI.Avatar src={donor.profilePhoto} />}
                        rightIcon={<ActionInfo />}
                        primaryText={donor.fullName}
                        secondaryText={"Blood Group: " + donor.bloodGroup}
                        onTouchTap={() => this.handleListItemClick(donor.uid)}
                    />
                    <MUI.Divider />
                </div>
                )
            })
        return listItems;
    }

    handleChange = (event, index, value) => this.setState({ bloodgroup: value });

    componentWillMount() {
        if (this.props.isAuthenticated) {
            this.props.getDonorList("A+");
        }
    }
    render() {
        return (
            <div>
                <MUI.SelectField style={styles.SelectField}
                    ref="bloodGroup"
                    floatingLabelText="Select Blood Group"
                    value={this.state.bloodgroup}
                    floatingLabelFixed={true}
                    hintText="Search Blood Group"
                    onChange={this.handleChange}
                >
                    {
                        data.bloodgroups.map(bloodgroup => {
                            return <MUI.MenuItem key={bloodgroup} value={bloodgroup} primaryText={bloodgroup} />
                        })
                    }
                </MUI.SelectField>

                <div style={styles.donerListContainer}>
                    <MUI.List>
                        <MUI.Subheader style={styles.subHeader} inset={false}>Donor List</MUI.Subheader>
                        {
                            this.listDonors()
                        }
                        <Dimmer
                            active={this.props.isProcessing}
                            page
                        >
                            <Header as='h2' icon inverted>
                                {/*<Icon name='heart' />*/}
                                {/*Dimmed Message!*/}
                                <Header.Subheader><Loader inverted content='Loading' /></Header.Subheader>
                            </Header>
                        </Dimmer>
                    </MUI.List>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DonorList);