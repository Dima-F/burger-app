import React from 'react';
import styles from './Button.module.css';

export default function Button(props) {
    return (
        <button disabled={props.disabled} className={[styles.Button, styles[props.btnType]].join(' ')} onClick={props.clicked}>
            {props.children}
        </button>
    )
}
