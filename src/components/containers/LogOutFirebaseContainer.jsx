import {connect} from 'react-redux';
import { signOutRequest } from '../../redux/firebaseActions';
import LogOutFirebase from '../LogOutFirebase';


const mapDispatchToProps = (dispatch) => {
    return {
        onLogOut: () => {
            dispatch(signOutRequest())
            console.log("desconectadoddddddddddddddddddd")
        }
    }
}

const mapStateToProps = (state) => {
    return {
        loged: state.userState.loged,
        fetching: state.userState.fetching
    }
}

 const LogOutFirebaseContainer = connect(mapStateToProps, mapDispatchToProps)(LogOutFirebase)

 export default LogOutFirebaseContainer