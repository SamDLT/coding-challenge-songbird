import { Subject } from 'rxjs/Subject';
import { startWith } from 'rxjs/operator/startWith';
import { scan } from 'rxjs/operator/scan';

// create our stream as a subject so arbitrary data can be sent on the stream
const action$ = new Subject();

// Initial State
const initState = { };

// Redux reducer
const reducer = (state, action) => {
  switch(action.type) {
    case 'DEVICE_SELECTED':
      return {
        ...state,
        selectedDevice: action.payload
      };
    default:
      return state;
  }
}

// Reduxification
export const store$ = action$
    ::startWith(initState)
    ::scan(reducer);

const actionDispatcher = (func) => (...args) =>
  action$.next(func(...args));

export const selectDevice = actionDispatcher((payload) => ({
  type: 'DEVICE_SELECTED',
  payload
}));
