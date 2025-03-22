import React from 'react'

import { connect } from 'react-redux'
import { fetchProducts } from '../../redux/productActions'  
import MainPage from '../MainPage'

const mapStateToProps = (state) => {
    console.log(state);
    return {
        products: state.products.products.products,
        fetching: state.fetching
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchProducts: () => {
            dispatch(fetchProducts())
        }
    }
}

const MainPageContainer = connect(mapStateToProps, mapDispatchToProps)(MainPage)

export default MainPageContainer
