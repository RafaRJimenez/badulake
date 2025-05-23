import React from 'react'

import { connect } from 'react-redux'
import { fetchProducts,setPage, httpRequest } from '../../redux/productActions'  
import MainPage from '../MainPage'
import { selectPages } from '../../redux/selectors/pages.js'
import { addBasket } from '../../redux/basketActions.js'

const mapStateToProps = (state) => {
     console.log("this is state", state);
    return {
        total: state.products.products.total,
        products: state.products.products.products,
        fetching: state.products.fetching,
        pages: selectPages(state),
        page: state.products.page,
        authFirebase: state.authFirebase,
        categories: state.products.categories
    }    
}



const mapDispatchToProps = (dispatch) => {
    return {
        fetchProducts: (page) => {
            dispatch(fetchProducts(page))
        },
        httpRequest: (method, url) => {
            dispatch(httpRequest(method, url)) // Despacha la acción httpRequest
        },
        setPage: (page) => {
            dispatch(setPage(page)); // Despacha la acción para actualizar `page`
          },
          addNewProduct: (product) => {
            // console.log(product)
            // console.log("product", product)
            dispatch(addBasket(product)); // Despacha la acción para agregar el producto al carrito
          },
    }
}

const MainPageContainer = connect(mapStateToProps, mapDispatchToProps)(MainPage)

export default MainPageContainer
