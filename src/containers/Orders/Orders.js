import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

export class Orders extends Component {
    componentDidMount() {
        this.props.onFetchOrders();
    }
    render() {
        return !this.props.loading ? (
            <div>
                { this.props.orders.map(order => {
                    return (
                        <Order
                            key={order.id}
                            ingredients={order.ingredients}
                            price={order.price.toFixed(2)}
                        />
                    );
                })}
            </div>
        ) : <Spinner/>
    }
}
const mapStateToProps = state => ({
    orders: state.order.orders,
    loading: state.order.loading
});

export default connect(mapStateToProps, { onFetchOrders: actions.fetchOrders })(withErrorHandler(Orders, axios));
