import TimeLine from '../../components/TimeLine'
import ChatDrawer from '../../components/Chat/ChatDrawer';
import React from 'react';
export default class ProfileView extends React.Component {
  render() {
    return  (
           <div>
           <div className="container">
            <div className="row">
            <div className="co-lg-5 col-md-6 col-sm-5 col-xs-5 ">

            </div>
            <div className="co-lg-6 col-md-6 col-sm-6 col-xs-6 ">
             <TimeLine/>
            </div>

            <div className="co-lg-1 col-md-1 col-sm-1 col-xs-1 ">
              <ChatDrawer/>
            </div>
          </div>
          </div>
          </div>
    );
  }
};
