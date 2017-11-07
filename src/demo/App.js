import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

import '../publish_component/Stepper'
import Stepper from '../publish_component/Stepper';
import DummyData from '../publish_component/DummyData'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            steps: DummyData
        };
    }


    render() {
        return (
            <div className="container-fluid App no-gutters">
                <div className="row" style={{marginBottom: '2rem'}}>
                    <div className="col no-gutters">
                        <header className="App-header">
                            <img src={logo} className="App-logo" alt="logo"/>
                            <h1 className="App-title">Welcome to React</h1>
                        </header>
                    </div>
                </div>
                <div className="row justify-content-center align-items-center">
                    <div className="col-8">
                        <Stepper steps={this.state.steps}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
