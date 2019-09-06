import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import styles from './CheckoutSummary.module.css';

export default function CheckoutSummary(props) {
    return (
        <div className={styles.CheckoutSummary}>
            <h1>We hope it taste well!</h1>
            <div style={{width:'100%', margin: 'auto'}}>
                <Burger ingredients={props.ingredients}/>
                <Button btnType='Danger' clicked={props.checkoutCanceled}>CANCEL</Button>
                <Button btnType='Success' clicked={props.checkoutContinued}>CONTINUE</Button>
            </div>
        </div>
    )
}
