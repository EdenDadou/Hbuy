import React, { Component } from 'react';
import { MaterialCommunityIcons, Entypo, AntDesign } from '@expo/vector-icons';
import { Container, Text, FooterTab, Button, View } from 'native-base';
import { StyleSheet, Image, ScrollView, Modal, TouchableOpacity, Dimensions } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import _AnnoncesList from './Elements/Annonces/_AnnoncesList';
import { connect } from "react-redux";
import { UserLogout } from './../../Redux/auth/actions';
import { ChangeLocale } from './../../Redux/locale/actions';
import { translate } from "./../../Locale/local";
const { width, height } = Dimensions.get('window');

class Annonces extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      UserInfoOpen: false
    }
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  UserInfos = () => {
    if (this.props.connected === 'false') {
      this.props.navigation.navigate('Connexion')
    } else {
      this.setState({ UserInfoOpen: !this.state.UserInfoOpen });
    }
  }

  logout = () => {
    this.props.UserLogout()
    this.setState({ UserInfoOpen: !this.state.UserInfoOpen });
  }

  handleChangeLanguage = () => {
    if (this.props.Locale === 'fr') {
      this.props.ChangeLocale('en')
      this.setState({ UserInfoOpen: !this.state.UserInfoOpen });
    } else if (this.props.Locale === 'en') {
      console.log('here1')
      this.props.ChangeLocale('fr')
      this.setState({ UserInfoOpen: !this.state.UserInfoOpen });
    }

  }

  render() {
    return (
      <Container style={{ flex: 1 }}>

        {/* ----------------------------------Header---------------------------------- */}
        <LinearGradient colors={['#20554f', '#020506']} style={{ height: 60 }}>
          <View style={styles.titlePosition}>
            <Text style={styles.titleText}>{translate("ANNONCE_TITLE", this.props.Locale)}</Text>

          </View>

        </LinearGradient>

        <Image style={{ width: 60, height: 60, position: 'absolute', top: 20, flex: 1, left: 20, zIndex: 1 }}
          source={require('./../images/logo.png')} />

        <Button transparent style={{ position: 'absolute', right: 10, top: 20 }}
          onPress={() => this.UserInfos()}>
          {this.props.connected === true ?
            (<Text style={{color: 'white', marginBottom: 10, fontSize:16 }}>{this.props.userName}</Text>)
            : (<AntDesign style={{ color: 'white' }} size={30} name='adduser' />)}

        </Button>


        {/* ----------------------------------Content---------------------------------- */}

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
                          source={require('./../images/french.png')}
                        />
                        <Text style={styles.info}>Francais</Text>
                      </View>)
                      : (<View style={{ display: 'flex', flexDirection: 'row', padding: 10 }}>
                        <Image
                          style={{ height: 30, width: 30, marginRight: 10 }}
                          source={require('./../images/english.png')}
                        /><Text style={styles.info}>English</Text>
                      </View>)}
                  </Button>
                  <Button style={{ backgroundColor: '#20554f', textAlign: 'center' }} onPress={() => this.logout()}>
                    <Text>{translate("LOGOUT", this.props.Locale)}</Text>
                  </Button>
                </View>
              </LinearGradient>

            </View>
          </TouchableOpacity>
        </Modal>

        <LinearGradient colors={['#1e3d42', '#020506']} style={{ height: 70, flex: 8 }}>
          <ScrollView>

            <_AnnoncesList navigation={this.props.navigation} />


          </ScrollView>
        </LinearGradient>

        {/* ----------------------------------Nav Menu---------------------------------- */}


        <LinearGradient colors={['#20554f', '#020506']} style={{ height: 70 }}>
          <FooterTab>
            <Button vertical onPress={() => this.props.navigation.navigate('News')}>
              <AntDesign style={{ color: 'white' }} size={30} name="like1" />
              <Text style={styles.text}>{translate("NEWS_TITLE", this.props.Locale)}</Text>
            </Button>
            <Button vertical onPress={() => this.props.navigation.navigate('Horses')}>
              <MaterialCommunityIcons style={{ color: 'white' }} size={30} name="trophy" />
              <Text style={{ color: 'white', fontSize: 9 }}>{translate("HORSE_TITLE", this.props.Locale)}</Text>
            </Button>
            <Button vertical active onPress={() => this.props.navigation.navigate('Annonces')}>
              <MaterialCommunityIcons style={{ color: '#20554f' }} size={30} name="horseshoe" />
              <Text style={{color:'#20554f', fontSize: 9}}>{translate("ANNONCE_TITLE", this.props.Locale)}</Text>
            </Button>
            <Button vertical onPress={() => this.props.navigation.navigate('Contact')}>
              <Entypo style={{ color: 'white' }} size={30} name="mail" />
              <Text style={styles.text}>{translate("CONTACT_TITLE", this.props.Locale)}</Text>
            </Button>
            <Button vertical onPress={() => this.props.navigation.navigate('Favoris')}>
              <AntDesign style={{ color: 'white' }} size={30} name="hearto" />
              <Text style={styles.text}>{translate("FAVORIS_TITLE", this.props.Locale)}</Text>
            </Button>
          </FooterTab>
        </LinearGradient>

      </Container >
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 9,
    color: 'white'
  },
  name: {
    fontSize: 20,
    marginBottom: 5,
    color: 'white'
  },
  info: {
    fontSize: 15,
    margin: 2,
    color: 'white'
  },
  titlePosition: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 15,
    zIndex: 0
  },
  titleText: {
    fontSize: 25,
    color: 'white',
    textShadowOffset: { width: 50, height: 50 },
    textDecorationStyle: 'double'
  },
})


const mapStateToProps = ({ auth, locale }) => {
  const { connected, idUser, userName } = auth;
  const { Locale } = locale;
  return { connected, idUser, Locale, userName };
};


export default
  connect(mapStateToProps,{ UserLogout, ChangeLocale } )(Annonces);
