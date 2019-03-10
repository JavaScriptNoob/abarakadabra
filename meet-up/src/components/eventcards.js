import React, { Component } from 'react';


 class EventCards extends Component {
   
  render() {
    return (
      <div>
        <p>Here we will make shopcards</p>
        <p>{this.props.date}</p>
      </div>
    )
  }
}
export default EventCards ;