import React, {Component} from 'react';
import './App.css';
import Fetch from './Fetch/fetch.js';
import {DevicesContainer} from './Device/device.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CircularProgress from 'material-ui/CircularProgress';
import DeviceDetails from './DeviceDetails/deviceDetails.js';
import {serverURL} from './constants.json';

class App extends Component {

  updateDevices() {
    this.fetchComponent.update();
  }

  render() {
    const url = serverURL + '/devices';

    return (
      <MuiThemeProvider>
        <div>
          <div className="display-inline-block left-panel">
            <Fetch url={url} ref={(comp) => { this.fetchComponent = comp; }}>
              {
                ({ data: devices }, update) =>
                  devices ? (<DevicesContainer devices={devices} updateDevices={update}/>) :
                    (<CircularProgress className="progress-center-within-left-panel"/>)
              }
            </Fetch>
          </div>
          <div className="display-inline-block right-panel">
            <DeviceDetails update={() => this.updateDevices()}/>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
