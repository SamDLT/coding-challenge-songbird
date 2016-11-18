import React from 'react';
import {List, ListItem} from 'material-ui/List';
import ChevronRight from 'material-ui/svg-icons/navigation/chevron-right';
import Subheader from 'material-ui/Subheader';
import { selectDevice } from '../redux.js';

export const DevicesContainer = ({ devices }) => {
  return (
      <List className="device-container-list">
        <Subheader>Devices</Subheader>
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
  )
}
