import React, {Component} from 'react'
import PropTypes from 'prop-types'

class StepIndicator extends Component {
    constructor(props) {
        super(props);

        // Methods binding this
        this.isStepActive = this.isStepActive.bind(this);
    }

    isStepActive(index) {
        if (this.props.currentStep.index === index) {
            return 'activated'
        } else {
            return 'deactivated'
        }
    }

    render() {
        return (
            <div className={['step', this.isStepActive(this.props.index)].join(' ')}
                 style={{width: `${100 / this.props.stepsLength}%`}}
            >
                <div className="circle">
                    <i className="material-icons md-18">
                        {(this.props.step.completed) ? 'done' : this.props.step.icon}
                    </i>
                </div>
                <div className="step-title">
                    <h4>{this.props.step.title}</h4>
                    <h5 className="step-subtitle">{this.props.step.subtitle}</h5>
                </div>
            </div>
        )
    }
}

StepIndicator.propTypes = {
    index: PropTypes.number,
    step: PropTypes.object,
    currentStep: PropTypes.object,
    stepsLength: PropTypes.number

};

export default StepIndicator;