import React from 'react';
import isEqual from 'lodash.isequal';

export default class Fetch extends React.Component{

  state = {data: null}
  shouldFetchData = true;

  fetchData() {
    fetch(this.props.url, this.props.options || {})
    .then(res => res.json()).then(data => {
      this.shouldFetchData = false;
      this.setState({data: data});
    })
    .catch(error => {
      console.log(error);
    })
  }

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate() {
    this.logicToFetchData();
  }

  logicToFetchData() {
    if(this.shouldFetchData)
      this.fetchData();
    else
      this.shouldFetchData = true;
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(nextProps === this.props && isEqual(nextState, this.state)) {
      return false;
    }
    return true;
  }

  update() {
    this.forceUpdate();
  }

  render() {
    return this.props.children(this.state, () => this.update());
  }
}
