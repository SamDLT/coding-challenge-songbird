import React, {Component} from 'react';
import {Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import {store$} from '../redux.js';
import Fetch from '../Fetch/fetch.js';
import CircularProgress from 'material-ui/CircularProgress';
import {serverURL} from '../constants.json';

class DeviceDetails extends Component {

  state = {
    name: 'No device selected'
  }

  componentWillMount() {
    store$.subscribe((state) =>
        state.selectedDevice && this.setState(state.selectedDevice));
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
                ({ data: readings }) => {
                  console.log(readings)
                  return readings ? (<span>We have data. {id}</span>) :
                    (<CircularProgress className="progress-center-within-left-panel"/>)
                }
              }
              </Fetch> :
              <span>Click on a device to the left to display more Information.</span>
          }
        </CardText>
        <CardActions>
          <FlatButton label="Action1" />
          <FlatButton label="Action2" />
        </CardActions>
      </Card>
    )
  }
};

export default DeviceDetails;
