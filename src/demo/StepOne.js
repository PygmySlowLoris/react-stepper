import React, {Component} from 'react'
import {required, email} from "./Validadtions";

class StepOne extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            name: '',
            checkbox: false
        };

        // Bind methods
        this.handleInputChange = this.handleInputChange.bind(this)
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    render() {
        return (
            <div style={{padding: '2rem 3rem', textAlign: 'left'}}>
                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" name="email" placeholder="Enter email"
                           value={this.state.email} onChange={this.handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label>Name</label>
                    <input type="text" className="form-control" name="name" placeholder="Name"
                           value={this.state.name} onChange={this.handleInputChange}
                    />
                </div>
                <div className="form-check">
                    <label className="form-check-label">
                        <input type="checkbox" className="form-check-input"/>
                        Check me out
                    </label>
                </div>
            </div>
        )
    }
}

export default StepOne