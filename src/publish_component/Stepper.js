import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {CSSTransition} from 'react-transition-group'
import update from 'immutability-helper';

//Styles
import './Stepper.css'
import 'animate.css'

//Components
import TopButtons from './TopButtons';
import BottomButton from './BottomButtons';
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
            stepComponent: '',
            transition: true,
            transitionTimeout: 1000,
            classNameTransitions: {}
        };

        // Binding Methods
        this.activateStep = this.activateStep.bind(this);
        this.nextStep = this.nextStep.bind(this);
        this.backStep = this.backStep.bind(this);
        this.changeNextBtnValue = this.changeNextBtnValue.bind(this);
        this.proceed = this.proceed.bind(this);
    }

    activateStep(index, back = false) {
        if (this.props.steps[index]) {
            // Setting states
            if (!back) {
                // LiftUp
                this.props.completedStep(this.state.currentStep);
            }

            this.setState({previousStep: this.state.currentStep});
            this.setState((prevState, props) => ({
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
        }
        // LiftUp
        this.props.activeStep(this.state.currentStep);
    }

    nextStep() {
        let newNextButton = update(this.state, {
            nextButton:  {[this.state.currentStep.name]: {$set: true}},
        });
        this.setState({
            ...newNextButton,
            canContinue: false
        });

        this.setState({
            classNameTransitions: {
                enter: 'animated fadeInRight',
                enterActive: 'animated fadeInRight',
                exit: 'animated fadeOutLeft',
                exitActive: 'animated fadeOutLeft',
            }
        });

        if (this.state.canContinue) {

            if (this.state.finalStep) {
                // LiftUp
                this.props.stepperFinished(this.state.currentStep);
                return;
            }

            this.setState({transition: false});

            let currentIndex = this.state.currentStep.index + 1;
            this.activateStep(currentIndex);

            // Handle transition and component render
            setTimeout(() => {
                this.setState((prevState, props) => ({
                    stepComponent: props.steps[prevState.currentStep.index].component,
                    transition: true
                }));
            }, this.state.transitionTimeout)

        }
    }

    backStep() {
        this.setState({
            classNameTransitions: {
                exit: 'animated fadeOutRight',
                exitActive: 'animated fadeOutRight',
                enter: 'animated fadeInLeft',
                enterActive: 'animated fadeInLeft',
            }
        });

        this.setState({transition: false});

        // LiftUp
        this.props.clickingBack();

        // Handle transition and component render
        setTimeout(() => {
            this.setState((prevState, props) => ({
                stepComponent: props.steps[prevState.previousStep.index].component,
                transition: true
            }));
        }, this.state.transitionTimeout);

        setTimeout(() => {
            let currentIndex = this.state.currentStep.index - 1;
            if (currentIndex >= 0) {
                this.activateStep(currentIndex, true);
            }
        }, this.state.transitionTimeout + 500);
    }

    proceed(payload) {
        this.setState({
            canContinue: payload.value
        })
    }

    changeNextBtnValue(payload) {
        let newNextBtnValue = update(this.state, {
           nextButton: {[this.state.currentStep.name]: {$set: payload.nextBtnValue}}
        });
        this.setState(newNextBtnValue);
    }

    // Component Lifecycle
    componentWillMount() {
        // Initiate stepper
        this.activateStep(0);
        let newNextButton = {};

        this.props.steps.forEach((step) => {
            newNextButton = Object.assign(newNextButton, {[step.name]: false})
        });

        this.setState((prevState, props) => ({
            stepComponent: props.steps[prevState.currentStep.index].component,
            nextButton: newNextButton
        }));

    }

    render() {

        // Store component in variable
        const StepComponent = this.state.stepComponent;

        return (
            <div className="stepper-box">
                <div className="top">
                    <div className="divider-line"
                         style={{width: `${(100 / (this.props.steps.length) * (this.props.steps.length - 1)) - 10}%`}}
                    />
                    <div className="steps-wrapper">
                        <TopButtons show={this.props.topButtons} previous={true}
                                    currentIndex={this.state.currentStep.index}
                                    onBackStep={this.backStep}/>

                        {/*Loops through indicator to show based on step amount*/}
                        {this.props.steps.map((step, index, array) =>
                            <StepIndicator step={step} index={index} stepsLength={array.length}
                                           currentStep={this.state.currentStep} key={step.name}/>
                        )}

                        <TopButtons show={this.props.topButtons} previous={false}
                                    canContinue={this.state.canContinue}
                                    onNextStep={this.nextStep}/>
                    </div>
                </div>

                <div className="content">
                    <CSSTransition in={this.state.transition}
                                   timeout={this.state.transitionTimeout}
                                   classNames={this.state.classNameTransitions}
                    >
                        <StepComponent canContinue={this.proceed}
                                       changeNext={this.changeNextBtnValue}
                                       currentStep={this.state.currentStep}
                                       clickedNext={this.state.nextButton[this.state.currentStep.name]}
                        />
                    </CSSTransition>
                </div>


                <div className={['bottom', (this.state.currentStep.index > 0) ? '' : 'only-next'].join(' ')}>
                    <BottomButton previous={true} onBackStep={this.backStep}
                                  currentIndex={this.state.currentStep.index}/>

                    <BottomButton previous={false} canContinue={this.state.canContinue}
                                  onNextStep={this.nextStep} finalStep={this.state.finalStep}/>
                </div>
            </div>
        )
    }
}

Stepper.propTypes = {
    locale: PropTypes.string,
    topButtons: PropTypes.bool,
    steps: PropTypes.array,
    keepAlive: PropTypes.bool,
    clickingBack: PropTypes.func,
    completedStep: PropTypes.func,
    activeStep: PropTypes.func,
    stepperFinished: PropTypes.func
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