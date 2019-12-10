import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Footer from './Footer';
import Sidebar from './Sidebar';
import { getuserdata } from './actions/UserAction.js';
import Setting from './Setting';

// import axios from 'axios';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signinemail:'x@yahoo.in',
      signinpass:'x'
    };
  }

  componentDidMount() {
   // this.SignInn();
  }

  SignInn (){
   
    let mail = this.state.signinemail;
    let pass = this.state.signinpass;

    this.props.getuserdata(mail,pass, () => {
            
    })   
  }

  // SignInn (){
   
  //   let mail = this.state.signinemail;
  //   let pass = this.state.signinpass;
  //   const data = [];
  //   data.push({ kanPass: pass }, { 'kanEmail': mail });
  //   let url = 'http://localhost:3000/SignInData';
  //   axios.post(url, data).then((response) => {
  //      alert(JSON.stringify(response.data));
  //     if (response.data === '') {
  //       this.setState({ toLogin: false, errmsg: 'Please,Check Your Email And Password' });
  //     } else {
  //       this.setState({ toLogin: true });
  //     }
  //   });
    
  // }
  render() {

 // const { userd } = this.props;
 // alert(JSON.stringify(userd));
 
  
    return (

        
    <div class="page-wrapper chiller-theme sidebar-bg bg1 toggled">
        <a id="show-sidebar" class="btn btn-sm btn-dark" href="@">
            <i class="fas fa-bars"></i>
        </a>
        <nav id="sidebar" class="sidebar-wrapper">
           <Sidebar/>
           
            <Footer/>
        </nav>
        
        <Setting/>
    </div>
       
 
    );
  }
}
App.propTypes = {
  userd: PropTypes.array.isRequired   
};

const mapStateToProps = state => ({
  userd: state.user.userdata
})
export default connect(mapStateToProps, { getuserdata })(App); 