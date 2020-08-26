import React from 'react';
import { Button, Item, Input, Content, Icon, Toast } from 'native-base';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { UserAuthentification } from "../../Redux/auth/actions";
import { translate } from "./../../Locale/local";
import { connect } from "react-redux";


class Connexion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            UserEmail: "",
            UserPassword: ""
        }
    }

    componentDidUpdate = () => {
        if (this.props.connected === true) {
            this.props.navigation.navigate('Horses')
        }
    }



    login = () => {

        const { UserEmail } = this.state;
        const { UserPassword } = this.state;

        if (UserEmail == "") {
            Toast.show({
                text: 'Please enter an email adress',
                duration: 3000,
                position: "top",
                type: "warning"
              })
        }
        else if (UserPassword == "") {
            Toast.show({
                text: "Please enter your password",
                duration: 3000,
                position: "top",
                type: "warning"
              })
        }
        else {
            const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if (reg.test(UserEmail) === true) {
                this.props.UserAuthentification(UserEmail, UserPassword);
                setTimeout(()=>{
                    
                    if(this.props.connected !==true){
                        Toast.show({
                            text: "There is a problem, please verify your conexion information",
                            duration: 3000,
                            position: "top",
                            type: "danger"
                        })
                    }
                    },800)
            }
            else {
                Toast.show({
                    text: "This is not a valid email adress",
                    duration: 3000,
                    position: "top",
                    type: "warning"
                  })
            }
        }
    }

    render() {

        console.log(this.props)
        return (
            <View style={{ flex: 1 }}>

                {/* -----------------------Connexion et Inscription---------------------------------- */}

                <View style={styles.connexion}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Horses')} style={{ position: 'absolute', top: 5, right: 5 }}>
                  <AntDesign style={{ color: 'white', marginTop:20 }} size={25} name="closecircleo" />
                </TouchableOpacity>
                    <Image style={{ width: 200, height: 200, marginTop: 50, borderRadius: 100 }}
                        source={require('../images/logo.png')} />

                    <View>

                        <Item rounded style={styles.input}>
                            <Input style={styles.textInput} placeholder='Email'
                                onChangeText={UserEmail => this.setState({ UserEmail })} />
                        </Item>

                        <Item rounded style={styles.input}>
                            <Input style={styles.textInput} password placeholder='Password'
                                onChangeText={UserPassword => this.setState({ UserPassword })} />
                        </Item>

                        <Button block style={styles.button} onPress={this.login}>

                            <Text style={styles.text}>{translate("CONNECT", this.props.Locale)} </Text>
                        </Button>
                        <Button block style={styles.button} onPress={() => this.props.navigation.navigate('Register')}>
                            <Text style={styles.text}>{translate("REGISTER", this.props.Locale)}</Text>
                            <Icon color="black"
                                size={15} name='ios-arrow-forward' />
                        </Button>
                    </View>

                </View>


            </View>
        )
    }
}


const styles = StyleSheet.create({
    topscreen: {
        backgroundColor: 'orange',
        flex: 2,
    },
    connexion: {
        backgroundColor: '#1e3d42',
        flex: 40,
        alignItems: 'center'
    },
    input: {
        backgroundColor: 'white',
        width: 240,
        height: 60,
        marginTop: 25
    },
    button: {
        marginTop: 25,
        width: 240,
        height: 55,
        justifyContent: 'center',
        backgroundColor: '#020506'
    },
    text: {
        fontSize: 17,
        color: 'white'
    },
    textInput: {
        fontSize: 20
    }
})


const mapStateToProps = ({ auth, locale }) => {
    const { connected } = auth;
    const { Locale } = locale;
    return { connected, Locale };
};


export default
    connect(mapStateToProps, { UserAuthentification })(Connexion);
