import React, {Component} from 'react'
import {required, email} from "./Validadtions";
import Form from 'react-validation/build/form';
import { control } from 'react-validation';

// Define own Input component
const Input = ({ error, isChanged, isUsed, ...props }) => (
    <div className="form-group">
        <label>{ props.label }</label>
        <input type="text" className={['form-control', (isChanged && isUsed && error)].join(' ')} {...props} />
    </div>
);

const MyValidationInput = control(Input);

class StepOne extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            name: ''
        };

        // Bind methods
        this.handleInputChange = this.handleInputChange.bind(this)
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });

        let formHasErrors = Object.keys(this.form.state.byId).filter(id => this.form.state.byId[id].error).length > 0;

        if(formHasErrors) {
            this.props.canContinue({value: false})
        } else {
            this.props.canContinue({value: true})
        }
    }

    componentWillMount() {
    }

    render() {
        return (
            <div style={{padding: '2rem 3rem', textAlign: 'left'}}>
                <Form ref={c => { this.form = c }}>
                    <MyValidationInput label={'Email *'} type={'email'} name={'email'} placeholder={'Enter email'}
                                       value={this.state.email} onChange={this.handleInputChange}
                                       validations={[required, email]}
                    />
                    <MyValidationInput label={'Name *'} placeholder={'Name'} name={'name'} value={this.state.name}
                                       onChange={this.handleInputChange} validations={[required]}
                    />
                </Form>
            </div>
        )
    }
}

export default StepOne