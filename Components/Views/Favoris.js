import React, { Component } from 'react';
import { MaterialCommunityIcons, Entypo, AntDesign } from '@expo/vector-icons';
import { Container, Text, FooterTab, Button, View } from 'native-base';
import { StyleSheet, Image, ScrollView, FlatList, Modal, TouchableOpacity, Dimensions } from 'react-native';
import { getFavorisHorses } from './../../Services/horses';
import { connect } from "react-redux";
import { UserLogout } from './../../Redux/auth/actions';
import { ChangeLocale } from './../../Redux/locale/actions';
import { LinearGradient } from 'expo-linear-gradient';
import _HorseList from './Elements/Horses/_HorseList';
import _Horse from './Elements/Horses/_Horse';
import { translate } from "./../../Locale/local";
const { width, height } = Dimensions.get('window');


class Favoris extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      id_userfavoris: '',
      favorisHorses: null,
      UserInfoOpen: false
    }
  }

  componentDidMount() {
    this._isMounted = true;

    let id_user = this.props.idUser
    console.log(id_user)
    getFavorisHorses(id_user)
      .then((responseJson) => {
        this.setState({ favorisHorses: responseJson.data });
      })
      .catch((error) => {
        console.log(error);
      });
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


  //------------- DEBUT du render -------------------//

  render() {
    let FavorisHORSES = this.state.favorisHorses
    console.log(FavorisHORSES)
    return (
      <Container style={{ flex: 1 }}>

        {/* ----------------------------------Header---------------------------------- */}
        <LinearGradient colors={['#20554f', '#020506']} style={{ height: 60 }}>
          <View style={{ flex: 1 }}>
            <View style={styles.titlePosition}>
              <Text style={styles.titleText}>Favoris</Text>

            </View>
          </View>
        </LinearGradient>

        <Image style={{ width: 60, height: 60, position: 'absolute', top: 20, flex: 1, left: 20, zIndex: 1 }}
          source={require('./../images/logo.png')} />

        <Button transparent style={{ position: 'absolute', right: 10, top: 20 }}
          onPress={() => this.UserInfos()}>
          {this.props.connected === true ?
            (<Text style={{ color: 'white', marginBottom: 10, fontSize: 16 }}>{this.props.userName}</Text>)
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
            {this.props.connected === true ?
              (this.state.favorisHorses !== null && this.state.favorisHorses.length > 0 ?
                (<FlatList
                  data={FavorisHORSES}
                  renderItem={({ item, index }) => <_Horse navigation={this.props.navigation} horse={item} index={index} />}
                  keyExtractor={item => item.id.toString()} />)
                : (<View style={{}}><Text style={{ margin: 'auto', color: 'white', fontSize: 15, marginTop: 200, textAlign: 'center' }}>{translate("NOT_YET_FAV", this.props.Locale)}</Text></View>))
              : (<View style={{}}><Text style={{ margin: 'auto', color: 'white', fontSize: 15, marginTop: 200, textAlign: 'center' }}>{translate("NOT_CONNECTED", this.props.Locale)}</Text></View>)}
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
            <Button vertical onPress={() => this.props.navigation.navigate('Annonces')}>
              <MaterialCommunityIcons style={{ color: 'white' }} size={30} name="horseshoe" />
              <Text style={styles.text}>{translate("ANNONCE_TITLE", this.props.Locale)}</Text>
            </Button>
            <Button vertical onPress={() => this.props.navigation.navigate('Contact')}>
              <Entypo style={{ color: 'white' }} size={30} name="mail" />
              <Text style={styles.text}>{translate("CONTACT_TITLE", this.props.Locale)}</Text>
            </Button>
            <Button vertical active onPress={() => this.props.navigation.navigate('Favoris')}>
              <AntDesign style={{ color: '#20554f' }} size={30} name="hearto" />
              <Text style={{ color: '#20554f', fontSize: 9 }}>{translate("FAVORIS_TITLE", this.props.Locale)}</Text>
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
  }, sliderBar: {
    backgroundColor: '#20554f'
  },
  selectedBar: {
    backgroundColor: '#39968C'

  },
  label: {
    color: 'white',
    fontSize: 12,
    marginTop: 8
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    margin: 'auto',
    display: 'flex',
    justifyContent: 'center'
  },
  infoPosition: {
    display: 'flex', flexDirection: "row", justifyContent: 'space-between', width: "100%"
  },
  sexePosition: {
    display: 'flex', flexDirection: "row", justifyContent: 'space-around'
  },
  animatedBox: {
    flex: 1,
    zIndex: 1,
    marginTop: 25,
    padding: 10
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
  ajoutRecent: {
    height: 24,
    width: 90,
    borderRadius: 10,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderBottomRightRadius: 0,
    backgroundColor: '#09191c',
    padding: 0,
    display: 'flex',
    justifyContent: 'center'
  },
  mostView: {
    height: 24,
    width: 90,
    borderRadius: 10,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 0,
    backgroundColor: '#09191c',
    padding: 0,
    display: 'flex',
    justifyContent: 'center'
  },
  viewSort: {
    display: 'flex',
    flexDirection: 'row',
    position: 'relative',
    left: 110,
    marginBottom: 3,
    marginTop: 0
  }

})


const mapStateToProps = ({ auth, locale }) => {
  const { connected, idUser, userName } = auth;
  const { Locale } = locale;
  return { connected, idUser, userName, Locale };
};


export default
  connect(mapStateToProps, { UserLogout, ChangeLocale })(Favoris);
