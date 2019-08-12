import React from 'react';
import Aux from '../../hoc/Aux';
import styles from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';

export default function Layout(props) {
    return (
        <Aux>
            <Toolbar/>
            <div>
                Toolbar, SideDrawer, Backdrop
            </div>
            <main className={styles.Content}>
                {props.children}
            </main>
        </Aux>
    )
}
