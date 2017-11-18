import React, {Component} from 'react'
import PropTypes from 'prop-types'

class StepTwo extends Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(e) {
        e.preventDefault();
        this.props.canContinue({value: true});
    }

    render() {
        return (
            <div style={{padding: '2rem 3rem', textAlign: 'left'}}>
                <div className="btn btn-warning btn-block" onClick={this.handleClick}>
                    Click to enable finish button
                </div>
            </div>
        )
    }
}

export default StepTwo