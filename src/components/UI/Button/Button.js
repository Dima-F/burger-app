import React from 'react';
import styles from './Button.module.css';

export default function Button(props) {
    return (
        <button className={[styles.Button, styles[props.btnType]].join(' ')} onClick={props.clicked}>
            {props.children}
        </button>
    )
}
