import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group'

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
            finalStep: false,
            transition: false
        };

        // Binding Methods
        this.activateStep = this.activateStep.bind(this);
        this.nextStep = this.nextStep.bind(this);
        this.backStep = this.backStep.bind(this);
    }

    activateStep(index, back = false) {
        if (this.props.steps[index]) {
            // Setting states
            this.setState((prevState, props) => ({
                previousStep: prevState.currentStep,
                currentStep: {
                    name: props.steps[index].name,
                    index: index
                }
            }));

            if (index + 1 === this.props.steps.length) {
                this.setState({finalStep: true})
            } else {
                this.setState({finalStep: false})
            }

            if (!back) {
                // this.$emit('completed-step', this.previousStep);
            }
        }
        // this.$emit('active-step', this.currentStep);
    }

    nextStep() {
        if (this.state.canContinue) {
            if (this.state.finalStep) {
                // this.$emit('stepper-finished', this.currentStep);
            }
            let currentIndex = this.state.currentStep.index + 1;
            this.activateStep(currentIndex);

        }
        this.setState((prevState) => ({
            nextButton: {[prevState.currentStep.name]: true},
            canContinue: false
        }));
        this.forceUpdate();
    }

    backStep() {
        // this.$emit('clicking-back');
        let currentIndex = this.state.currentStep.index - 1;
        if (currentIndex >= 0) {
            this.activateStep(currentIndex, true);
        }
    }

    componentWillMount() {
        // Initiate stepper
        this.activateStep(0);
        this.props.steps.forEach((step) => {
            this.setState({
                nextButton: {[step.name]: false}
            })
        });
    }

    render() {

        // Store component in variable
        const StepComponent = this.props.steps[this.state.currentStep.index].component;

        return (
            <div className="stepper-box">
                <div className="top">
                    <div className="divider-line"
                         style={{width: `${(100 / (this.props.steps.length) * (this.props.steps.length - 1)) - 10}%`}}
                    />
                    <div className="steps-wrapper">
                        <TopButtons show={this.props.topButtons} previous={true}
                                    currentIndex={this.state.currentStep.index}/>

                        {/*Loops through indicator to show based on step amount*/}
                        {this.props.steps.map((step, index, array) =>
                            <StepIndicator step={step} index={index} stepsLength={array.length}
                                           currentStep={this.state.currentStep} key={step.name}/>
                        )}

                        <TopButtons show={this.props.topButtons} previous={false}
                                    currentIndex={this.state.currentStep.index}/>
                    </div>
                </div>

                <div className="content">
                    <CSSTransition in={this.state.transition}>
                        <StepComponent/>
                    </CSSTransition>
                </div>


                <div className={['bottom', (this.state.currentStep.index > 0) ? '' : 'only-next'].join(' ')}>
                    {this.state.currentStep.index > 0 && (
                        <div className="stepper-button previous" onClick={this.backStep}>
                            <i className="material-icons">keyboard_arrow_left</i>
                            <span>Back</span>
                        </div>
                    )}
                    <div className={['stepper-button next', !this.state.canContinue ? 'deactivated' : ''].join(' ')}
                         onClick={this.nextStep}
                    >
                        <span>Next</span>
                        <i className="material-icons">keyboard_arrow_right</i>
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