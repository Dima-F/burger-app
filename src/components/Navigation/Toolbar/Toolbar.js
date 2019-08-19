import React from 'react';
import styles from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrower/DrawerToggle/DrawerToggle';

export default function Toolbar(props) {
    return (
        <header className={styles.Toolbar}>
            <DrawerToggle clicked={props.drawToggleClick}/>
            <div className={styles.Logo}>
                <Logo />
            </div>
            <nav className={styles.DesktopOnly}>
                <NavigationItems />
            </nav>
        </header>
    )
}
