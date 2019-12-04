import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import { connect } from 'react-redux';
import styles from './Auth.module.css';
import { Redirect } from 'react-router-dom';
import * as actions from '../../store/actions/index';
import { checkValidity } from '../../shared/utility';

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

    componentDidMount() {
        console.log(process);
        if(!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
            this.props.setAuthRedirectPath('/');
        }
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {
                isSignup: !prevState.isSignup
            }
        });
    }

    inputChangedHandler = (e, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: e.target.value,
                valid: checkValidity(e.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        }
        this.setState({
            controls: updatedControls
        });
    }

    auth = () => {
        const { email, password } = this.state.controls;
        this.props.auth(email.value, password.value, this.state.isSignup);
    }

    submitHandler = (e) => {
        e.preventDefault();
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
                <Button btnType="Success" clicked={this.auth}>SUBMIT</Button>
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
        let authRedirect = null;
        if(this.props.isAuthenticated) {
            authRedirect = <Redirect  to={this.props.authRedirectPath}/>
        }
        return (
            <div className={styles.Auth}>
                {authRedirect}
                {errorMessage}
                {form}
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    };
}

export default connect(mapStateToProps, {
    auth: actions.auth,
    onSetAuthRedirectPath: actions.setAuthRedirectPath
})(Auth);
