import {connect} from 'react-redux';
import { signInRequest } from '../../redux/firebaseActions';
import LoginFirebase from '../LoginFirebase';

const mapDispatchToProps = (dispatch) => {
    return {
        onLogin: (email, password) => {
            dispatch(signInRequest(email, password))
        }
    }
}

const mapStateToProps = (state) => {
    return {
        loged: state.userState.loged,
        fetching: state.userState.fetching
    }
}

const FirebaseAuthContainer = connect(mapStateToProps, mapDispatchToProps)(LoginFirebase)

export default FirebaseAuthContainer;