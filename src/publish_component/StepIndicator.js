import React, {Component} from 'react'
import PropTypes from 'prop-types'

class StepIndicator extends Component {
    render() {
        return (
            <div className="step">
                <div className="circle">
                    <i className="material-icons md-18">
                        done
                    </i>
                </div>
                <div className="step-title">
                    <h4>Test</h4>
                    <h5 className="step-subtitle">Subtest</h5>
                </div>
            </div>
        )
    }
}

StepIndicator.propTypes = {
};

export default StepIndicator;