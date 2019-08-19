import React, { Component } from 'react';
import Aux from '../Aux/Aux';
import styles from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrower from '../../components/Navigation/SideDrower/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrower: false
    }
    sideDrawerClosedHandler = () => {
        this.setState({ showSideDrower:false });
    }
    sideDrawerToggleHandler = () => {
        this.setState(prevState => {
            return {
                showSideDrower: !prevState.showSideDrower
            };
        });
    }
    render() {
        return (
            <Aux>
                <Toolbar drawToggleClick={this.sideDrawerToggleHandler}/>
                <SideDrower open={this.state.showSideDrower} closed={this.sideDrawerClosedHandler}/>
                <div>
                    Toolbar, SideDrawer, Backdrop
                </div>
                <main className={styles.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

export default Layout;