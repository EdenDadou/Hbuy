import React from 'react'
import { Button, Item, Input, Content, Icon } from 'native-base'
import { StyleSheet, View, Image, Text, TouchableOpacity} from 'react-native'



class Register extends React.Component {

    // {/* ----------------------------------PHP---------------------------------- */}

    constructor(props) {

        super(props)
        this.state = {
            UserName: "",
            LastName:'',
            FirstName:'',
            UserEmail: "",
            UserPhone: "",
            UserPassword: ""
        }
    }

    Registration = () => {


        const { UserName } = this.state.FirstName + ' ' + this.state.LastName;
        const { UserEmail } = this.state;
        const { UserPhone } = this.state;
        const { UserPassword } = this.state;
        const { UserPassword2 } = this.state;

        if (UserName == "" || UserEmail == "" || UserPhone == "" || UserPassword == "") {
            alert("Veuillez remplir tous les champs");
        }else if(UserPassword!=UserPassword2){
            alert('Les mots de passes ne sont pas identiques')
        }
        else {
            fetch('http://www.h-buy.fr/App/user_registration.php', {
                method: 'post',
                header: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    name: UserName,
                    email: UserEmail,
                    phone: UserPhone,
                    password: UserPassword,
                    confirmPassword: UserPassword2
                })
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    alert(responseJson)
                    if (responseJson == 'User Registered Successfully') {
                        this.props.navigation.navigate('Connexion')

                    } else {
                        alert(responseJson);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor:'#1e3d42'}}>

                {/* ----------------------------------Inscription---------------------------------- */}


                <View style={styles.topscreen}>
                    <TouchableOpacity style={{flexDirection:'row', marginLeft: 20}} onPress={() => this.props.navigation.navigate('Connexion')}>
                    <Icon style={{color:"white"}}
                        size={15} name='ios-arrow-back' />
                        <Text style={{color:'white', paddingLeft: 10, marginTop:8}}>Connexion</Text>

                    </TouchableOpacity>
                </View>
                <View style={styles.connexion}>


                    <Item rounded style={styles.input}>
                        <Input style={styles.textInput} placeholder='First Name'
                            onChangeText={FirstName => this.setState({ FirstName })} />
                    </Item>

                    <Item rounded style={styles.input}>
                        <Input style={styles.textInput} placeholder='Last Name'
                            onChangeText={LastName => this.setState({ LastName })} />
                    </Item>

                    <Item rounded style={styles.input}>
                        <Input style={styles.textInput} placeholder='Email'
                            onChangeText={UserEmail => this.setState({ UserEmail })} />
                    </Item>
                    <Item rounded style={styles.input}>
                        <Input style={styles.textInput} placeholder='WhatsApp or number'
                            onChangeText={UserPhone => this.setState({ UserPhone })} />
                    </Item>
                    <Item rounded style={styles.input}>
                        <Input style={styles.textInput} placeholder='Password'
                            onChangeText={UserPassword => this.setState({ UserPassword })}
                            secureTextEntry={true} />
                    </Item>
                    <Item rounded style={styles.input}>
                        <Input style={styles.textInput} placeholder='Confirm Password'
                            onChangeText={UserPassword2 => this.setState({ UserPassword2 })}
                            secureTextEntry={true} />
                    </Item>

                    <Content>
                        <Button block rounded style={styles.button} onPress={this.Registration}>
                            <Text style={styles.text}> S'inscrire</Text>
                        </Button>
                    </Content>
                </View>
            </View>
        )
    }
}






const styles = StyleSheet.create({
    topscreen: {
        marginTop: 30,
        flex: 3,
        
    },
    connexion: {
        flex: 40,
        alignItems: 'center'
    },
    inscription: {
        flex: 10,
        alignItems: 'center'
    },
    input: {
        backgroundColor: 'white',
        width: 240,
        height: 55,
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



export default Register;