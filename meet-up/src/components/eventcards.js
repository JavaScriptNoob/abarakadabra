import React, { Component } from 'react';


 class EventCards extends Component {
   
  render() {
    return (
      <div>{this.props.data}
        <p>Here we will make shopcards</p>
        <p> Hello:{this.props.stateData}</p>
        <p></p>
        <p></p>
      </div>
    )
  }
}
export default EventCards ;