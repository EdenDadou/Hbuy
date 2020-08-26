import React, { Component } from 'react';
import { MaterialCommunityIcons, Entypo, FontAwesome, AntDesign } from '@expo/vector-icons';
import { Container, Text, FooterTab, Button, View } from 'native-base';
import { StyleSheet, Image, ScrollView, Dimensions, ImageBackground, Modal, TouchableOpacity } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { UserAuthentification, UserLogout } from "./../../../../Redux/auth/actions";
import { ChangeLocale } from './../../../../Redux/locale/actions';
import { translate } from "./../../../../Locale/local";
import { connect } from "react-redux";
const { width, height } = Dimensions.get('window')



export function getNewsImage(title) {
    return 'http://www.h-buy.fr/n_pic/' + title
}



class _NewsView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            UserInfoOpen:false
        }
    }

    UserInfos = () => {
        if (this.props.connected !== true) {
          this.props.navigation.navigate('Connexion')
        } else {
          this.setState({ UserInfoOpen: !this.state.UserInfoOpen });
        }
      }


    render() {

        const { navigation } = this.props;
        console.log(navigation)
        const newstitle = navigation.getParam('newstitle');
        const article = navigation.getParam('article');





        return (
            <Container style={{ flex: 1 }}>

                 {/*---------- Modal infoUser -------------*/}
                 <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.UserInfoOpen}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                    }}>
                    <TouchableOpacity style={{ height: height, width: width, backgroundColor: 'rgba(0,0,0,0.5)' }} onPress={this.UserInfos}>
                        <View style={{ height: height / 7, width: width * 0.5, backgroundColor: '#1e3d42', justifyContent: 'center', marginLeft: width * 0.5, marginTop: 60, borderRadius: 5 }}>
                            <LinearGradient colors={['#20554f', '#020506']} style={{ height: 100 }}>
                                <View >
                                    <Button style={{ backgroundColor: '#20554f', textAlign: 'center' }} onPress={() => this.handleChangeLanguage()}>
                                        {this.props.Locale == 'en' ?
                                            (<View style={{ display: 'flex', flexDirection: 'row', padding: 10 }}>
                                                <Image
                                                    style={{ height: 30, width: 30, marginRight: 10 }}
                                                    source={require('./../../../images/french.png')}
                                                />
                                                <Text style={styles.info}>Francais</Text>
                                            </View>)
                                            : (<View style={{ display: 'flex', flexDirection: 'row', padding: 10 }}>
                                                <Image
                                                    style={{ height: 30, width: 30, marginRight: 10 }}
                                                    source={require('./../../../images/english.png')}
                                                /><Text style={styles.info}>English</Text>
                                            </View>)}
                                    </Button>
                                    <Button style={{ backgroundColor: '#20554f', textAlign: 'center' }} onPress={() => this.logout()}>
                                        <Text style={styles.info}>{translate("LOGOUT", this.props.Locale)}</Text>
                                    </Button>
                                </View>
                            </LinearGradient>

                        </View>
                    </TouchableOpacity>
                </Modal>


                {/* ----------------------------------Header---------------------------------- */}
                <LinearGradient colors={['#20554f', '#020506']} style={{ height: 60 }}>

                </LinearGradient>

                <Image style={{ width: 60, height: 60, position: 'absolute', top: 20, flex: 1, left: 20, zIndex: 1 }}
                    source={require('./../../../images/logo.png')} />

                <Button transparent style={{ position: 'absolute', right: 10, top: 20 }}
                    onPress={() => this.UserInfos()}>
                    {this.props.connected === true ?
                        (<Text style={{ color: 'white', marginBottom: 10, fontSize: 16}}>{this.props.userName}</Text>)
                        : (<AntDesign style={{ color: 'white' }} size={30} name='adduser' />)}
                </Button>


                {/* ----------------------------------Content---------------------------------- */}



                <LinearGradient colors={['#1e3d42', '#020506']} style={{ height: 70, flex: 8 }}>
                    <View style={styles.newsView}>
                        <ScrollView>
                            <ImageBackground
                                source={{ uri: getNewsImage(newstitle) }}
                                style={styles.image}>
                                <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.8)']}
                                    style={{ height: height / 3, width: width * 0.95 }}>
                                    <View style={styles.title_container}>
                                        <Text style={styles.title}>{newstitle}</Text>
                                    </View>
                                </LinearGradient>
                            </ImageBackground>
                            <Text style={styles.description_text} >{article}</Text>
                        </ScrollView>
                    </View>
                </LinearGradient>


                {/* ----------------------------------Nav Menu---------------------------------- */}

                <LinearGradient colors={['#20554f', '#020506']} style={{ height: 70 }}>
                    <FooterTab>
                        <Button vertical active onPress={() => this.props.navigation.navigate('News')}>
                            <AntDesign style={{ color: '#20554f' }} size={30} name="like1" />
                            <Text style={{ color: '#20554f', fontSize: 9 }}>News</Text>
                        </Button>
                        <Button vertical onPress={() => this.props.navigation.navigate('Horses')}>
                            <MaterialCommunityIcons style={{ color: 'white' }} size={30} name="trophy" />
                            <Text style={styles.text}>Horses</Text>
                        </Button>
                        <Button vertical onPress={() => this.props.navigation.navigate('Annonces')}>
                            <MaterialCommunityIcons style={{ color: 'white' }} size={30} name="horseshoe" />
                            <Text style={styles.text}>Annonce</Text>
                        </Button>
                        <Button vertical onPress={() => this.props.navigation.navigate('Contact')}>
                            <Entypo style={{ color: 'white' }} size={30} name="mail" />
                            <Text style={styles.text}>Contact</Text>
                        </Button>
                        <Button vertical onPress={() => this.props.navigation.navigate('Favoris')}>
                            <AntDesign style={{ color: 'white' }} size={30} name="hearto" />
                            <Text style={styles.text}>Favoris</Text>
                        </Button>
                    </FooterTab>
                </LinearGradient>
            </Container >
        );
    }
}

const styles = StyleSheet.create({
    newsView: {
        height: height - 140,
        borderColor: '#20554f',
        borderWidth: 0.3,
        backgroundColor: 'rgba(32, 85, 79, 0.15)',
        shadowOffset: { width: 5, height: 5, },
        shadowColor: 'black',
        shadowOpacity: 1.0,
    },
    image: {
        width: width * 0.95,
        height: height / 3,
        marginTop: 20,
        marginHorizontal: width * 0.025,
        backgroundColor: 'gray',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    title_container: {
        height: height / 2,
        // width: width*0.8,
        marginTop: height / 3 - 80,
        marginHorizontal: width * 0.05,
    },
    title: {
        fontWeight: '300',
        fontSize: 20,
        flex: 1,
        color: 'white',
        bottom: 10,
        textAlign: 'center',
        zIndex: 1,
        width: width * 0.8
    },
    description_text: {
        fontStyle: 'italic',
        color: 'white',
        marginHorizontal: width * 0.05,
        marginVertical: height * 0.025,
        textAlign: 'justify',
        fontSize: 18
    },
    text: {
        fontSize: 9,
        color: 'white'
    },
    date_container: {
        flex: 1
    },
    date_text: {
        textAlign: 'right',
        fontSize: 14
    }
})

const mapStateToProps = ({ auth, locale }) => {
    const { connected, idUser, userName } = auth;
    const { Locale } = locale;
    return { connected, idUser, userName, Locale };
  };
  
  
  export default
    connect(mapStateToProps, { UserAuthentification, UserLogout, ChangeLocale })(_NewsView);
  

