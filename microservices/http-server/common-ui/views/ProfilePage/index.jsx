import React from 'react';
import Profile from '../../components/Profile';
import MediaQuery from 'react-responsive';
import MainAppBar from '../../components/MainAppBar';
import ChatDrawer from '../../components/Chat/ChatDrawer';

export default class HomePage extends React.Component {
  constructor() {
    super();
  }

  render() {

    var style = {
      paddingRight:0,
    };

    var bodyContainer = {
      padding: "16px",
      paddingTop: "80px",

    }

  return (
              <div>
                <MainAppBar/>
                <MediaQuery query='(max-device-width: 800px)'>
                  <MediaQuery query='(max-width: 800px)'>

                  </MediaQuery>
                </MediaQuery>

                <MediaQuery query='(min-device-width: 800px)'>
                  <MediaQuery query='(min-width: 800px)'>
                    <div className="container-fluid" >
                      <div className="row" >
                        <div style={{width: "100%"}} >
                          <div className="row" >
                            <div className="col-md-12 col-sm-12 col-xs-12 col-lg-12" style={bodyContainer}>
                              <div className="row">
                                  <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-lg-offset-1" >
                                    <Profile/>
                                  </div>
                                  <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5" >

                                  </div>
                                  <div className="col-xs-1 col-sm-1 col-md-1 col-lg-1"  style={{paddingTop:20}}>
                                    <ChatDrawer/>
                                  </div>
                              </div>
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>
                  </MediaQuery>
                </MediaQuery>
                </div>
            );
  }
};
