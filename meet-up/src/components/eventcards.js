import React, { Component } from 'react';


 class EventCards extends Component {
   
  render() {
    return (
      <div>
        <p>Here we will make shopcards</p>
        <p>{this.props.date}</p>
        <p>{this.props.place}</p>
        <p>{this.props.country}</p>
      </div>
    )
  }
}
export default EventCards ;