import React from 'react';
import styles from './Modal.module.css';
import Aux from '../../../hoc/Aux';
import Backdrop from '../Backdrop/Backdrop';

export default function Modal(props) {
    return (
        <Aux>
            <Backdrop show={props.show} clicked={props.modalClosed}/>
            <div
                className={styles.Modal}
                style={{
                    transform: props.show ? 'translateY(0)': 'translateY(-100vh)',
                    opacity: props.show ? '1' : '0'
                }}>
                {props.children}
            </div>
        </Aux>
    )
}
