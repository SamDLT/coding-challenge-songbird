import React, {Component} from 'react';
import {List, ListItem} from 'material-ui/List';
import ChevronRight from 'material-ui/svg-icons/navigation/chevron-right';
import Subheader from 'material-ui/Subheader';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import { selectDevice } from '../redux.js';

export class DevicesContainer extends Component  {
  state = {
    open: false,
    value: ''
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  handleChange = (event) => {
    this.setState({
      value: event.target.value,
    });
  };

  submitDevice() {
    const {updateDevices} = this.props;
    debugger;
    updateDevices();
    this.handleClose();
  }

  render() {
    const {devices} = this.props;

    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Add Device"
        primary={true}
        keyboardFocused={true}
        onTouchTap={() => this.submitDevice()}
      />,
    ];

    return (
        <div>
          <List>
            <Subheader>Devices</Subheader>
            <ListItem
              primaryText="Add a device"
              onTouchTap={this.handleOpen}
            />
          </List>
          <Divider />
          <List className="device-container-list">
            {
              devices.map((device, i) =>
                <ListItem
                  primaryText={device.name}
                  rightIcon={<ChevronRight />}
                  onClick={() => selectDevice(device)}
                  key={i} />
              )
            }
          </List>
          <div>
            <Dialog
              title="Add a device"
              actions={actions}
              modal={false}
              open={this.state.open}
              onRequestClose={this.handleClose}
            >
              <TextField
                hintText="Device Name"
                errorText="This field is required"
                value={this.state.value}
                onChange={this.handleChange}
              />
            </Dialog>
          </div>
        </div>
    )
  }
}
