
import React from 'react'

class Forms extends React.Component {
    render() {
        return (
            <div>
                <form onSubmit={this.props.pushEvents} > 
                    <input type="text" name="city" placeholder="Which City..."/>
                    <input type="date" name="country" placeholder="Which country"/>
                    <button>Push Json</button>
                </form>
                <form onSubmit={this.props.getEvents} > 
                    <button>Get Fun</button>
                </form>
            </div>
        )   
    }
}
export default Forms ;