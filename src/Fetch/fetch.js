import React from 'react'

export default class Fetch extends React.Component{

  state = {data: null}

  componentDidMount() {
    fetch(this.props.url, this.props.options || {})
    .then(res => res.json()).then(data => {
      this.setState({data: data});
    })
    .catch(error => {
      console.log(error);
    })
  }

  render() {
    return this.props.children(this.state);
  }
}
