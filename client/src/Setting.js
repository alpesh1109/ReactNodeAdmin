import React, { Component } from 'react';

//import logo from './logo.svg';
//import './App.css';
// import axios from 'axios';


class Setting extends Component {
  constructor(props) {
    super(props);
       this.customjs = this.customjs.bind(this);
  }

  componentDidMount() {
    //this.SignInn();
   //  this.customjs();
  }
 customjs() {
       const script = document.createElement("script");
       script.src = "/assets/js/custom.js";
       document.body.appendChild(script);
    }
  
  render() {
  
    return (

        <main class="page-content">
        <div class="container-fluid">
            <div class="row">
                <div class="form-group col-md-12">
                    <h2>Hr Policy and Assistant</h2>
                   

                </div>
            </div>
            <hr/>
          
            
        </div>
    </main>   
    );
  }
}

export default Setting; 