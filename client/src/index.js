import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import loadjs from 'loadjs';
import botpresschart from './botpresschart';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import store from './configstore.js';
import { Provider } from 'react-redux';
import BotLog from './botlogs';
//import Footer from './Footer';
// import Sidebar from './Sidebar';
import '../src/chat.css';

loadjs('/assets/js/custom.js');

ReactDOM.render(<BrowserRouter forceRefresh={false}>
  <Provider store={store}>

    <body class="hold-transition skin-blue sidebar-mini">
      <div class="wrapper">


        <header class="main-header">

          <a href="javascript:void(0)" class="logo">
            <span class="logo-mini"><b>A</b>LT</span>
            <span class="logo-lg"><b>Analytics</b></span>
          </a>


          <nav class="navbar navbar-static-top" role="navigation">

            <a href="#" class="sidebar-toggle" data-toggle="push-menu" role="button">
              <span class="sr-only">Toggle navigation</span>
            </a>

          </nav>
        </header>

        <aside class="main-sidebar">

          <section class="sidebar">

            <div class="user-panel">
              <div class="pull-left image">
                <img src="dist/img/user2-160x160.jpg" class="img-circle" alt="img" />
              </div>
              <div class="pull-left info">
                <p>Admin</p>


              </div>
            </div>


            <ul class="sidebar-menu" data-widget="tree">
              <li class="header">Dashboard</li>
              <li class="active"><Link to={{ pathname: '/' }}><i class="fa fa-bar-chart"></i> <span>Graphs</span></Link></li>
              <li><Link to={{ pathname: '/botlog' }}><i class="fa fa-history"></i> <span>History</span></Link></li>
              {/*<li class="active"><Link to={{ pathname: '/' }}><i class="fa fa-id-card"></i> <span>Policy</span></Link></li>
                <li><Link to={{ pathname: '/HrHistory' }}><i class="fa fa-history"></i> <span>History</span></Link></li>*/}

            </ul>

          </section>

        </aside>


        <div class="content-wrapper">

          <section class="content-header">

          </section>


          <section class="content container-fluid">

            <Switch>

              <Route exact path="/" component={botpresschart} />
              <Route exact path="/botlog" component={BotLog} />

            </Switch>

          </section>

        </div>

        <footer class="main-footer">

          <div class="pull-right hidden-xs">

          </div>

          <strong>Copyright &copy; 2019 <a href="https://www.fusioninformatics.com/" target="_blank">Fusion Informatics</a>.</strong> All rights reserved.
          </footer>


        <aside class="control-sidebar control-sidebar-dark">

          <ul class="nav nav-tabs nav-justified control-sidebar-tabs">
            <li class="active"><a href="#control-sidebar-home-tab" data-toggle="tab"><i class="fa fa-home"></i></a></li>
            <li><a href="#control-sidebar-settings-tab" data-toggle="tab"><i class="fa fa-gears"></i></a></li>
          </ul>

          <div class="tab-content">

            <div class="tab-pane active" id="control-sidebar-home-tab">
              <h3 class="control-sidebar-heading">Recent Activity</h3>
              <ul class="control-sidebar-menu">
                <li>
                  <a href="javascript:;">
                    <i class="menu-icon fa fa-birthday-cake bg-red"></i>

                    <div class="menu-info">
                      <h4 class="control-sidebar-subheading">Langdon's Birthday</h4>

                      <p>Will be 23 on April 24th</p>
                    </div>
                  </a>
                </li>
              </ul>


              <h3 class="control-sidebar-heading">Tasks Progress</h3>
              <ul class="control-sidebar-menu">
                <li>
                  <a href="javascript:;">
                    <h4 class="control-sidebar-subheading">
                      Custom Template Design
                        <span class="pull-right-container">
                        <span class="label label-danger pull-right">70%</span>
                      </span>
                    </h4>

                    <div class="progress progress-xxs">
                      <div class="progress-bar progress-bar-danger" style={{ width: '70%' }}></div>
                    </div>
                  </a>
                </li>
              </ul>

            </div>

            <div class="tab-pane" id="control-sidebar-stats-tab">Stats Tab Content</div>

            <div class="tab-pane" id="control-sidebar-settings-tab">
              <form method="post">
                <h3 class="control-sidebar-heading">General Settings</h3>

                <div class="form-group">
                  <label class="control-sidebar-subheading">
                    Report panel usage
                      <input type="checkbox" class="pull-right" checked />
                  </label>

                  <p>
                    Some information about this general settings option
                    </p>
                </div>

              </form>
            </div>

          </div>
        </aside>

        <div class="control-sidebar-bg"></div>
      </div>


    </body>




  </Provider>
</BrowserRouter>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
