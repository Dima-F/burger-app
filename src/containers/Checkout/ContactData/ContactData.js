import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import styles from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

export class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Name'
                },
                value: '',
                validation: {
                    require: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email'
                },
                value: '',
                validation: {
                    require: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    require: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zip code'
                },
                value: '',
                validation: {
                    require: true,
                    minLength: 4
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    require: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest'},
                        { value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: '',
                validation: {},
                valid: true,
                touched: false
            },
        },
        formIsValid: false,
        loading: false
    };
    checkValidity(value, rules) {
        let isValid = true;

        if(rules.require) {
            isValid = value.trim() !== '' && isValid;
        }
        if(rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }
        if(rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;
    }

    inputChangedHandler = (e, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedOrderElement = {
            ...updatedOrderForm[inputIdentifier]
        };

        updatedOrderElement.value = e.target.value;
        updatedOrderElement.valid = this.checkValidity(updatedOrderElement.value, updatedOrderElement.validation);
        updatedOrderElement.touched = true;

        let formIsValid = true;
        for(let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid
        }

        updatedOrderForm[inputIdentifier] = updatedOrderElement;
        this.setState({
            orderForm: updatedOrderForm,
            formIsValid: formIsValid
        });
    }

    orderHandler = (e) => {
        e.preventDefault();
        this.setState({loading:true});
        const formData = {};
        for(let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData
        };
        axios.post('/orders.json', order)
            .then(res => {
                this.setState({loading:false});
                this.props.history.push('/');
            })
            .catch(err => {
                this.setState({loading:false});
            });
    }

    render() {
        const formElementsArr = [];
        for(let key in this.state.orderForm) {
            formElementsArr.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementsArr.map(el => (
                    <Input
                        key={el.id}
                        elementType={el.config.elementType}
                        elementConfig={el.config.elementConfig}
                        value={el.config.value}
                        changed={(event) => this.inputChangedHandler(event, el.id)}
                        invalid={!el.config.valid}
                        shouldValidate={el.config.validation}
                        touched={el.config.touched}
                    />
                ))}
                <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
            </form>
        );
        if(this.state.loading) {
            form = <Spinner/>;
        }
        return (
            <div className={styles.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        )
    }
}

export default ContactData