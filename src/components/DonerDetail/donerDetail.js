import React, { Component } from 'react';
import { connect } from 'react-redux';
import DonorMiddleware from '../../store/Middleware/donorMiddleware';
import { Card, Icon, Button, Dimmer, Header, Image, Segment } from 'semantic-ui-react'
import styles from './donorDetailStyle';
import NotificationSystem from 'react-notification-system';

function mapStateToProps(state) {
    return {
        donorDetail: state.DonorReducer.donorDetail,
    }
}
function mapDispatchToProps(dispatch) {
    return {
        getDonorDetail: (donorId) => dispatch(DonorMiddleware.getDonorDetail(donorId))
    }
}

class DonorDetail extends Component {
    componentWillMount() {
        this.props.getDonorDetail(this.props.params.id);
        console.log(this.props);
        console.log(this.props.donorDetail);
    }
    componentDidMount() {
        
    }
    constructor() {
        super();
        this.state = {
            active: false,
            request: false,
           
        }
    }
  
    handleOpen = () => {

        this.setState({ active: true, request: true });

    }

    handleClose = () => this.setState({ active: false });
    handleRequest = () => this.setState({ request: !this.state.request });
    render() {
        return (
            <div>
                <div style={styles.card}>
                    <center>
                        <div>
                            <Card
                                image={(this.props.donorDetail.profilePhoto == "") ? "http://skesummit.com/images/speakers/user_profile_demo.png" : this.props.donorDetail.profilePhoto}
                                header={this.props.donorDetail.fullName}
                                meta={'Blood Group: ' + this.props.donorDetail.bloodGroup}
                                description={'Address: ' + ' ' + this.props.donorDetail.address}
                            />

                            <Button basic
                                color={(!this.state.request) ? "green" : "red"}
                                onClick={(!this.state.request) ? this.handleOpen : this.handleRequest}
                            >{(this.state.request) ? "Cancel Blood Request" : "Request Blood"}</Button>
                        </div>
                    </center>
                    
                </div>
                <div>


                    <Dimmer
                        active={this.state.active}
                        onClickOutside={this.handleClose}
                        page
                    >
                        <Header as='h2' icon inverted>
                            <Icon name='heart' />
                            Request Sent!
                        </Header>
                    </Dimmer>
                </div>
            </div>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(DonorDetail);