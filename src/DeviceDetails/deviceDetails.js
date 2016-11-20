import React, {Component} from 'react';
import {Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import {store$} from '../redux.js';
import Fetch from '../Fetch/fetch.js';
import CircularProgress from 'material-ui/CircularProgress';
import {serverURL} from '../constants.json';

import {MetricsContainer} from './metricsContainer.js';

class DeviceDetails extends Component {

  state = {
    name: 'No device selected'
  }

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
      console.log(this.state);
    });
  }

  render() {
    const {name, id} = this.state;
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
                    <FlatButton label="Add Reading" />
                    <FlatButton label="Delete Device" secondary={true} onClick={() => this.deleteDevice()}/>
                  </div>
          }
        </CardActions>
      </Card>
    )
  }
};

export default DeviceDetails;
