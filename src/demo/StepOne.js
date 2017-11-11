import React, {Component} from 'react'
import PropTypes from 'prop-types'

class StepOne extends Component {
    render() {
        return (
            <div style={{padding: '2rem 3rem', textAlign: 'left'}}>
                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email"/>
                    <small className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Password"/>
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