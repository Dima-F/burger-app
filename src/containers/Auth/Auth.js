import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import { connect } from 'react-redux';
import styles from './Auth.module.css';
import * as actions from '../../store/actions/index';

export class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Address'
                },
                value: '',
                validation: {
                    require: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    require: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        isSignup: true
    }
    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {
                isSignup: !prevState.isSignup
            }
        })
    }

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }
        
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    inputChangedHandler = (e, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: e.target.value,
                valid: this.checkValidity(e.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        }
        this.setState({
            controls: updatedControls
        });
    }
    submitHandler = (event) => {
        event.preventDefault();
        const { email, password } = this.state.controls;
        this.props.auth(email.value, password.value, this.state.isSignup);
    }

    render() {
        const formElementsArr = [];
        for(let key in this.state.controls) {
            formElementsArr.push({
                id: key,
                control: this.state.controls[key]
            })
        }
        let form = (
            <form onSubmit={this.submitHandler}>
                {formElementsArr.map(el => (
                    <Input
                        key={el.id}
                        elementType={el.control.elementType}
                        elementConfig={el.control.elementConfig}
                        value={el.control.value}
                        changed={(event) => this.inputChangedHandler(event, el.id)}
                        invalid={!el.control.valid}
                        shouldValidate={el.control.validation}
                        touched={el.control.touched}
                    />
                ))}
                <Button btnType="Success">SUBMIT</Button>
                <Button
                    clicked={this.switchAuthModeHandler}
                    btnType="Danger">SWITCH TO {this.state.isSignup ? 'SIGNIN' : 'SIGNUP' }
                </Button>
            </form>
        );
        if(this.props.loading) {
            form = <Spinner />
        }
        let errorMessage = null;
        if(this.props.error) {
            errorMessage = (
                <p>{this.props.error.message}</p>
            )
        }
        return (
            <div className={styles.Auth}>
                {errorMessage}
                {form}
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error
    };
}

export default connect(mapStateToProps, { auth: actions.auth })(Auth);
