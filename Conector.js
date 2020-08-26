import React, { Suspense } from 'react'
import { Provider } from 'react-redux';
import { Root } from "native-base";
import { AppState } from 'react-native';
import { configureStore } from './Redux/store';
import Navigator from './Navigator';
import { UserAuthentification } from './Redux/auth/actions';
import { connect } from "react-redux";

class Conector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            appState: AppState.currentState,
        }
    }

    componentDidMount() {
        AppState.addEventListener('change', this._handleAppStateChange);
    }


    componentWillUnmount() {
        AppState.removeEventListener('change', this._handleAppStateChange);
    }

    _handleAppStateChange = (nextAppState) => {
        if (
            this.state.appState.match(/inactive|background/) &&
            nextAppState === 'active'
        ) {
            if (this.props.connected === 'true') {
                UserAuthentification(this.props.email, this.props.password)
            }
        }
        this.setState({ appState: nextAppState });
    };



    render() {
        console.log(this.props)
        return (
            <Navigator />
        )
    }
}


const mapStateToProps = ({ auth, locale }) => {
    const { connected, idUser, email, password } = auth;
    const { Locale } = locale;

    return { connected, idUser, email, password, Locale };
};


export default
    connect(mapStateToProps)(Conector);
