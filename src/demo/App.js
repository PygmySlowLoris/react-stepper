import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

import '../publish_component/Stepper'
import Stepper from '../publish_component/Stepper';
import DummyData from './DummyData'
import update from 'immutability-helper'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            steps: DummyData
        };

        this.completeStep = this.completeStep.bind(this);
        this.isStepActive = this.isStepActive.bind(this);
        this.backClicked = this.backClicked.bind(this);
        this.finish = this.finish.bind(this);
    }

    backClicked() {
        console.log('back');
    }

    finish(payload) {
        alert('step finished');
    }

    isStepActive(payload) {
        this.state.steps.forEach((step, index) => {
            if (step.name === payload.name) {
                if(step.completed === true) {
                    let stepNotActive = update(this.state, {
                        steps: {
                            [index]: {
                                completed: {$set: false}
                            }
                        }
                    });
                    this.setState(stepNotActive);
                }
            }
        })
    }

    completeStep(payload) {
        this.state.steps.forEach((step, index) => {
            if (step.name === payload.name) {
                let stepCompleted = update(this.state, {
                    steps: {
                        [index]: {
                            completed: {$set: true}
                        }
                    }
                });
                this.setState(stepCompleted);
            }
        })
    }


    render() {
        return (
            <div className="container-fluid App no-gutters">
                <div className="row no-gutters" style={{marginBottom: '2rem'}}>
                    <div className="col">
                        <header className="App-header">
                            <img src={logo} className="App-logo" alt="logo"/>
                            <h1 className="App-title">Welcome to React</h1>
                        </header>
                    </div>
                </div>
                <div className="row justify-content-center align-items-center">
                    <div className="col-8">
                        <Stepper steps={this.state.steps}
                                 completedStep={this.completeStep}
                                 activeStep={this.isStepActive}
                                 clickingBack={this.backClicked}
                                 stepperFinished={this.finish}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
