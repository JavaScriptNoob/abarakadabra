
import React from 'react'

class Forms extends React.Component {
    render() {
        return (
            <div className="container-form form-group  cob">
                <div className="title-form"><h4>Write date and place </h4></div> 
                <form   className=" row"> 
                    <input type="text" name="city" placeholder="Which City..." className=" form-control  form-control-lg  col-md-4"/>
                    <input type="date" name="country" placeholder="Which country"  className="form-control form-control-lg col-md-4" />
                   
                </form>
                <form onSubmit={this.props.getEvents} > 
                    <button >Get Fun</button>
                </form>
            </div>
        )   
    }
}
export default Forms ;