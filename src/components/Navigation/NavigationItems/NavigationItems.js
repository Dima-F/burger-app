import React from 'react';
import styles from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';
import Aux from '../../../hoc/Aux/Aux';

export default function NavigationItems(props) {
    return (
        <ul className={styles.NavigationItems}>
            <NavigationItem link="/" exact>Burger Builder</NavigationItem>
            
            { props.isAuthenticated ? (
                <Aux>
                    <NavigationItem link="/orders">Orders</NavigationItem>
                    <NavigationItem link="/logout">Logout</NavigationItem>
                </Aux>
            ) : (
                <NavigationItem link="/auth">Authenticate</NavigationItem>
            ) }
        </ul>
    )
}
