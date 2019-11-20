import React, { Component } from 'react';
import Aux from '../Aux/Aux';
import styles from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrower from '../../components/Navigation/SideDrower/SideDrawer';
import { connect } from 'react-redux';

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
                <Toolbar isAuth={this.props.isAuthenticated} drawToggleClick={this.sideDrawerToggleHandler}/>
                <SideDrower isAuth={this.props.isAuthenticated} open={this.state.showSideDrower} closed={this.sideDrawerClosedHandler}/>
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

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);