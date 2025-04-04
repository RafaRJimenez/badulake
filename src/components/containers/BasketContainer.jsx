import {connect} from 'react-redux';
import { addBasket, getBasket, editBasket, deleteBasket  } from '../../redux/basketActions';

import Basket2 from '../Basket2';


const mapDispatchToProps = (dispatch) => {
    return {
        callAddBasket: (product) => {
            dispatch(addBasket(product))
        },
        callEditBasket: (product) => {
            dispatch(editBasket(product))
        },
        callDeleteBasket: (productId) => {
            dispatch(deleteBasket(productId))
        },
        callGetBasket: () => {
            dispatch(getBasket())
        }
    }
}

const mapStateToProps = (state) => {
    console.log('Basket changed:',state.basket.basket);
    return {
        basket: state.basket.basket,
        fetching: state.basket.fetching
    }
}

const BasketContainer = connect(mapStateToProps, mapDispatchToProps)(Basket2)

export default BasketContainer;
