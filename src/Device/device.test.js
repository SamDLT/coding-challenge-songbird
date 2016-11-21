import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import { DevicesContainer } from './device';

const mockDevicesData = [
   {
      "name":"Pam's Refridgerator",
      "createdAt":"2016-08-30T13:51:55.000Z",
      "updatedAt":"2016-08-31T00:37:00.010Z",
      "type":"temperature",
      "value":49,
      "id":"SynvbP7s"
   },
   {
      "name":"Krieger's Van",
      "createdAt":"2016-08-30T19:36:55.000Z",
      "updatedAt":"2016-08-31T00:37:00.156Z",
      "type":"temperature",
      "value":75,
      "id":"SyjObPQo"
   },
   {
      "name":"Archer's Bedroom",
      "createdAt":"2016-08-30T12:56:56.000Z",
      "updatedAt":"2016-08-31T00:37:00.251Z",
      "type":"temperature",
      "value":73,
      "id":"Skk9Wvmi"
   },
   {
      "name":"Malory's Office",
      "createdAt":"2016-08-30T12:56:56.000Z",
      "updatedAt":"2016-08-31T00:37:00.414Z",
      "type":"temperature",
      "value":76,
      "id":"B105ZP7s"
   },
   {
      "name":"Barry's House",
      "createdAt":"2016-08-30T20:01:56.000Z",
      "updatedAt":"2016-08-31T00:37:00.579Z",
      "type":"temperature",
      "value":76,
      "id":"SkooZDXo"
   },
   {
      "name":"Other Barry's House",
      "createdAt":"2016-08-30T13:26:56.000Z",
      "updatedAt":"2016-08-31T00:37:00.671Z",
      "type":"temperature",
      "value":82,
      "id":"rJInWP7j"
   },
   {
      "name":"Lana's Nursery",
      "createdAt":"2016-08-30T13:36:56.000Z",
      "updatedAt":"2016-08-31T00:37:00.849Z",
      "type":"temperature",
      "value":102,
      "id":"HyN6Zw7j"
   },
   {
      "name":"Figgis Agency Front Door",
      "createdAt":"2016-08-30T13:01:56.000Z",
      "updatedAt":"2016-08-31T00:37:01.025Z",
      "type":"temperature",
      "value":105,
      "id":"S1xRbDQj"
   },
   {
      "name":"Ray's Wheelchair",
      "createdAt":"2016-08-30T13:36:56.000Z",
      "updatedAt":"2016-08-31T00:37:01.181Z",
      "type":"temperature",
      "value":95,
      "id":"SyA0ZDXo"
   },
   {
      "name":"Babou's Cage",
      "createdAt":"2016-08-30T14:31:56.000Z",
      "updatedAt":"2016-08-31T00:37:01.208Z",
      "type":"temperature",
      "value":70,
      "id":"S1iJMDQj"
   },
   {
      "name":"Test",
      "createdAt":"2016-09-06T02:17:20.067Z",
      "updatedAt":"2016-09-06T02:17:20.077Z",
      "id":"S1O4viss"
   },
   {
      "name":"Test 2",
      "createdAt":"2016-09-08T02:11:30.716Z",
      "updatedAt":"2016-09-08T02:11:30.717Z",
      "id":"rJjAuSAo"
   },
   {
      "name":"Final Test",
      "createdAt":"2016-09-13T02:54:15.371Z",
      "updatedAt":"2016-09-13T02:54:15.372Z",
      "id":"HkyP9yH3"
   }
];

it('renders without crashing', () => {
  shallow(<DevicesContainer devices={mockDevicesData}/>);
});
