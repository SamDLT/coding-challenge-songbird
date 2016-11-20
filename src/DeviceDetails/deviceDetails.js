import React, {Component} from 'react';
import {Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import {store$} from '../redux.js';
import Fetch from '../Fetch/fetch.js';
import CircularProgress from 'material-ui/CircularProgress';
import Dialog from 'material-ui/Dialog';
import {serverURL} from '../constants.json';

import {MetricsContainer} from './metricsContainer.js';

class DeviceDetails extends Component {

  state = {
    name: 'No device selected',
    open: false
  }

  openReadingDialog() {
    this.setState({open: true});
  }

  closeReadingDialog = () => {
    this.setState({open: false});
  };

  componentWillMount() {
    store$.subscribe((state) =>
        state.selectedDevice && this.setState(state.selectedDevice));
  }

  deleteDevice() {
    const {update} = this.props;
    fetch(serverURL + "/devices/"+this.state.id, {
      method: "DELETE",
    }).then((res) =>  {
      update();
      this.setState({name: 'No device selected', id: null});
    });
  }

  render() {
    const {name, id} = this.state;

    const actions = [
          <FlatButton
            label="Cancel"
            primary={true}
            onTouchTap={this.closeReadingDialog}
          />,
          <FlatButton
            label="Submit"
            primary={true}
            keyboardFocused={true}
            onTouchTap={this.closeReadingDialog}
          />,
        ];

    return (
      <Card>
        <CardHeader
          title="Device Information"
        />
        <CardTitle title={name} />
        <CardText>
          {
            id ?
              <Fetch url={serverURL + '/devices/'+id+'/readings'}>
              {
                ({ data: readings }) =>
                  readings ? <MetricsContainer readings={readings}/> :
                    (<CircularProgress className="progress-center-within-left-panel"/>)
              }
              </Fetch> :
              <span>Click on a device to the left to display more Information.</span>
          }
        </CardText>
        <CardActions>
          {
            id && <div>
                    <FlatButton label="Add Reading" onClick={() => this.openReadingDialog()}/>
                    <FlatButton label="Delete Device" secondary={true} onClick={() => this.deleteDevice()}/>
                  </div>
          }
        </CardActions>
        <Dialog
          title="Dialog With Actions"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.closeReadingDialog}
        >

        </Dialog>
      </Card>
    )
  }
};

export default DeviceDetails;
