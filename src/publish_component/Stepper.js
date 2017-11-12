import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {CSSTransition} from 'react-transition-group'

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
        this.setState({
            classNameTransitions: {
                enter: 'animated fadeInRight',
                enterActive: 'animated fadeInRight',
                exit: 'animated fadeOutLeft',
                exitActive: 'animated fadeOutLeft',
            }
        });

        if (this.state.canContinue) {
            this.setState({transition: false});

            if (this.state.finalStep) {
                // this.$emit('stepper-finished', this.currentStep);
            }

            let currentIndex = this.state.currentStep.index + 1;
            this.activateStep(currentIndex);

            // Handle transition and component render
            setTimeout(() => {
                this.setState((prevState, props) => ({
                    stepComponent: props.steps[prevState.currentStep.index].component,
                    transition: true
                }))
            }, this.state.transitionTimeout)

        }
        this.setState((prevState) => ({
            nextButton: {[prevState.currentStep.name]: true},
            canContinue: false
        }));
        this.forceUpdate();
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
        this.forceUpdate();
        // this.$emit('clicking-back');
        this.setState({transition: false});

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
        this.setState((prevState, props) => ({
            nextButton: {
                [prevState.currentStep.name]: payload.nextBtnValue
            }
        }));
        this.forceUpdate();
    }

    // Component Lifecycle
    componentWillMount() {
        // Initiate stepper
        this.activateStep(0);
        this.props.steps.forEach((step) => {
            this.setState((prevState, props) => ({
                nextButton: {[step.name]: false},
                stepComponent: props.steps[prevState.currentStep.index].component
            }))
        });
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