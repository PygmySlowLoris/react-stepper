import React, {Component} from 'react';
import PropTypes from 'prop-types';

//Styles
import './Stepper.css'

//Components
import TopButtons from './TopButtons';
import StepIndicator from './StepIndicator';

class Stepper extends Component {
    constructor(props) {
        // Declare props
        super(props);
        // Data
        this.state = {
            currentStep: {},
            previousStep: {},
            nextButton: {},
            canContinue: false,
            finalStep: false
        }
    }

    render() {
        return (
            <div className="stepper-box">
                <div className="top">
                    <div className="divider-line"
                         style={{width: `${(100 / (this.props.steps.length) * (this.props.steps.length - 1)) - 10}%`}}
                    />
                    <div className="steps-wrapper">
                        <TopButtons show={this.props.topButtons} previous={true}
                                    currentIndex={this.state.currentStep.index}/>

                        <StepIndicator/>

                        <TopButtons show={this.props.topButtons} previous={false}
                                    currentIndex={this.state.currentStep.index}/>
                    </div>
                </div>
            </div>
        )
    }
}

Stepper.propTypes = {
    locale: PropTypes.string,
    topButtons: PropTypes.bool,
    steps: PropTypes.array,
    keepAlive: PropTypes.bool
};

Stepper.defaultProps = {
    locale: 'en',
    topButtons: true,
    steps: [
        {
            icon: 'mail',
            name: 'first',
            title: 'Sample title 1',
            subtitle: 'Subtitle sample'

        },
        {
            icon: 'report_problem',
            name: 'second',
            title: 'Sample title 2',
            subtitle: 'Subtitle sample'
        }
    ],
    keepAlive: true
};

export default Stepper;