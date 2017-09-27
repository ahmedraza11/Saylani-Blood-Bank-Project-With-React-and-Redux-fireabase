import React, { Component } from 'react';
import { connect } from 'react-redux';
import  DonorMiddleware  from '../../store/Middleware/donorMiddleware';
import { style } from '../../style.js';

function mapStateToProps(state){
    return {
        isAuthenticated: state.AuthReducer.isAuthenticated,
        authUser: state.AuthReducer.authUser,
        donorList: state.DonorReducer.donorList,
        donorDetail: state.DonorReducer.donorDetail,
        isDetailUpdate: state.DonorReducer.isDetailUpdate
    };
}
function mapDispatchToProps(dispatch){
    return {
        registerDonor: (donorDetail) => dispatch(DonorMiddleware.registerDonor(donorDetail)),
        getDonorList: (bloodGroup) => dispatch(DonorMiddleware.getDonorDetail(bloodGroup)),
        getDonorDetail: (donorId) => dispatch(DonorMiddleware.getDonorDetail(donorId))
    }
}

class Dashboard extends Component {
    render(){
        return(
            <div>
                {this.props.children}
            </div>  
        );
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Dashboard);