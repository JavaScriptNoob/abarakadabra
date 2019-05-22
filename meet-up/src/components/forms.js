import React from "react";

class Forms extends React.Component {
  render() {
    const { values, handleChange } = this.props;
    return (
      <div className="container-form form-group  cob">
        <div className="title-form">
          <h4>Write date and place </h4>
        </div>
        <form className="row" onSubmit={this.props.getEvents}>
          <input
            type="text"
            name="city"
            placeholder="Which City..."
            className=" form-control  form-control-lg  col-md-4"
            onChange={handleChange('city')}
          />
          <input
            type="date"
            name="date"
            onChange={handleChange("date")}
            className="form-control form-control-lg col-md-4"
          />
          <button>Get Fun</button>
        </form>
      </div>
    );
  }
}
export default Forms;
