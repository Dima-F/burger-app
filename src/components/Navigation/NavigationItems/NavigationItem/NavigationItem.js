import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './NavigationItem.module.css';

export default function NavigationItem(props) {
    return (
        <li className={styles.NavigationItem}>
            <NavLink to={props.link} activeClassName={styles.active} exact={props.exact}>
                {props.children}
            </NavLink>
        </li>
    )
}
