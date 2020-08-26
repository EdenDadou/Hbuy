import React, { Component } from 'react';
import { MaterialCommunityIcons, Entypo, FontAwesome, AntDesign } from '@expo/vector-icons';
import { Container, Text, FooterTab, Button, View, Card, CardItem, Body, ListItem, CheckBox } from 'native-base';
import { StyleSheet, Image, ScrollView, FlatList, Dimensions, Modal, TouchableOpacity, AppState } from 'react-native';
import { mostView, mostRecent, getFiltredHorse } from './../../Services/horses';
import { UserLogout } from './../../Redux/auth/actions';
import { ChangeLocale } from './../../Redux/locale/actions';
import { LinearGradient } from 'expo-linear-gradient';
import _HorseList from './Elements/Horses/_HorseList';
import _Horse from './Elements/Horses/_Horse';
import MenuDrawer from 'react-native-side-drawer';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import DefaultMarker from './Components/DefaultMarker';
import { translate } from "./../../Locale/local";
import { connect } from "react-redux";
const { width, height } = Dimensions.get('window');

class Horses extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      appState: AppState.currentState,
      open: false,
      check1: false,
      check2: false,
      check3: false,
      competition: false,
      elevage: false,
      UserInfoOpen: false,
      size: [130, 190],
      gender: [],
      age: [0, 20],
      price: [0, 100000],
      type: [],
      connectedApp: false,

      verrouillageBackScreen: { flex: 1, justifyContent: 'center' },
      allowVerticalScroll: true,

      sort: null,
      filtredHorses: {}
    };
  }

  componentDidMount() {
    this._isMounted = true;
  }


  componentWillUnmount() {
    this._isMounted = false;
  }



  toggleOpen = () => {
    this.setState({ open: !this.state.open });
    if (this.state.open === false) {
      this.setState({ verrouillageBackScreen: { zIndex: 1, justifyContent: 'center' }, allowVerticalScroll: false })
    } else if (this.state.open === true) {
      setTimeout(() => {
        this.setState({ verrouillageBackScreen: { flex: 1, justifyContent: 'center' }, allowVerticalScroll: true })
      }, 150)
    };
  }

  handleDisabledChange = disabled => {
    this.setState({ disabled });
  };


  MSSizeValueChange = (values) => {
    this.setState({
      size: values,
    });
  }
  MSAgeValueChange = (values) => {
    this.setState({
      age: values,
    });
  }
  MSPriceValueChange = (values) => {
    this.setState({
      price: values,
    });
  }


  handleCheck1 = () => {
    this.setState({ check1: !this.state.check1 })
    let genderArray = this.state.gender
    if (this.state.gender[0] !== 'male' && this.state.gender[1] !== 'male' && this.state.gender[2] !== 'male') {
      this.setState({ gender: genderArray.concat('male') })
    } else {
      this.setState({ gender: genderArray.filter(gender => gender !== 'male') })
    }
  }
  handleCheck2 = () => {
    this.setState({ check2: !this.state.check2 })
    let genderArray = this.state.gender
    if (this.state.gender[0] !== 'femelle' && this.state.gender[1] !== 'femelle' && this.state.gender[2] !== 'femelle') {
      this.setState({ gender: genderArray.concat('femelle') })
    } else {
      this.setState({ gender: genderArray.filter(gender => gender !== 'femelle') })
    }

  }
  handleCheck3 = () => {
    this.setState({ check3: !this.state.check3 })
    let genderArray = this.state.gender
    if (this.state.gender[0] !== 'hongre' && this.state.gender[1] !== 'hongre' && this.state.gender[2] !== 'hongre') {
      this.setState({ gender: genderArray.concat('hongre') })
    } else {
      this.setState({ gender: genderArray.filter(gender => gender !== 'hongre') })
    }
  }

  handleCompetition = () => {
    this.setState({ competition: !this.state.competition })
    let typeArray = this.state.type
    if (this.state.type[0] !== 'competition' && this.state.type[1] !== 'competition') {
      this.setState({ type: typeArray.concat('competition') })
    } else {
      this.setState({ type: typeArray.filter(type => type !== 'competition') })
    }
  }

  handleElevage = () => {
    this.setState({ elevage: !this.state.elevage })
    let typeArray = this.state.type
    if (this.state.type[0] !== 'elevage' && this.state.type[1] !== 'elevage') {
      this.setState({ type: typeArray.concat('elevage') })
    } else {
      this.setState({ type: typeArray.filter(type => type !== 'elevage') })
    }
  }

  getFiltredHorses = () => {
    let { age, gender, price, size, type } = this.state;
    if (size[1] === 190) {
      size = [size[0], 300]
    }
    if (price[1] === 100000) {
      price = [price[0], 1000000000]
    }
    if (age[1] === 20) {
      age = [age[0], 40]
    }
    getFiltredHorse(size, age, gender, price, type)
      .then((responseJson) => {
        this.setState({ sort: 'filter', filtredHorses: responseJson.data, open: false, verrouillageBackScreen: { flex: 1, justifyContent: 'center', alignItems: 'center', }, allowVerticalScroll: true });

      })
      .catch((error) => {
        console.log(error);
      });
  }

  sortByView = () => {
    mostView()
      .then((responseJson) => {
        this.setState({ sort: 'view', filtredHorses: responseJson.data, open: false })
      })
      .catch((error) => {
        console.log(error);
      });
  }

  sortByRecent = () => {
    mostRecent()
      .then((responseJson) => {
        this.setState({ sort: 'recent', filtredHorses: responseJson.data, open: false })
      })
      .catch((error) => {
        console.log(error);
      });
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
      this.props.ChangeLocale('fr')
      this.setState({ UserInfoOpen: !this.state.UserInfoOpen });
    }

  }


  drawerContent = () => {

    return (
      <LinearGradient colors={['#20554f', '#020506']} style={{ height: 700, marginTop:-10 }}>
        <View style={styles.animatedBox}>


          <Card style={{ width: "100%" }}>
            <CardItem style={{ backgroundColor: '#1e3d42' }}>
              <Body  >
                <View style={{ width: "100%", height: 53 }}>

                  <View style={styles.infoPosition}>
                    <Text style={styles.label}>{this.state.size[0]} cm </Text>
                    <Text style={styles.title}>Taille</Text>
                    <Text style={styles.label}>{this.state.size[1]} {this.state.size[1] === 190 ? ('cm +') : ('cm')}</Text>
                  </View>
                  <MultiSlider
                    customMarker={DefaultMarker}
                    trackStyle={styles.sliderBar}
                    selectedStyle={styles.selectedBar}
                    values={[this.state.size[0], this.state.size[1]]}
                    sliderLength={170}
                    onValuesChange={this.MSSizeValueChange}

                    min={130}
                    max={190}
                    step={5}
                  />
                </View>
              </Body>
            </CardItem>
          </Card>

          <Card style={{ width: "100%" }}>
            <CardItem style={{ backgroundColor: '#1e3d42' }}>
              <Body  >
                <View style={{ width: "100%", height: 53 }}>

                  <View style={styles.infoPosition}>
                    <Text style={styles.label}>{this.state.age[0]} ans </Text>
                    <Text style={styles.title}>Age</Text>
                    <Text style={styles.label}>{this.state.age[1]} {this.state.age[1] === 20 ? ('ans +') : ('ans')}</Text>
                  </View>
                  <MultiSlider
                    customMarker={DefaultMarker}
                    trackStyle={styles.sliderBar}
                    selectedStyle={styles.selectedBar}
                    values={[this.state.age[0], this.state.age[1]]}
                    sliderLength={170}
                    onValuesChange={this.MSAgeValueChange}

                    min={0}
                    max={20}
                    step={1}
                  />
                </View>
              </Body>
            </CardItem>
          </Card>

          <Card style={{ width: "100%" }}>
            <CardItem style={{ backgroundColor: '#1e3d42' }}>
              <Body  >
                <View style={{ width: "100%", height: 53 }}>

                  <View style={styles.infoPosition}>
                    <Text style={styles.label}>{this.state.price[0]} € </Text>
                    <Text style={styles.title}>Prix</Text>
                    <Text style={styles.label}>{this.state.price[1]} {this.state.price[1] === 100000 ? ('€ +') : ('€')}</Text>
                  </View>

                  <MultiSlider
                    customMarker={DefaultMarker}
                    trackStyle={styles.sliderBar}
                    selectedStyle={styles.selectedBar}
                    values={[this.state.price[0], this.state.price[1]]}
                    sliderLength={170}
                    onValuesChange={this.MSPriceValueChange}

                    min={0}
                    max={100000}
                    step={5000}
                  />
                </View>
              </Body>
            </CardItem>
          </Card>
          <Card style={{ width: "100%" }}>
            <CardItem style={{ backgroundColor: '#1e3d42' }}>
              <Body  >
                <View style={{ width: "100%", height: 63 }}>

                  <View style={styles.sexePosition}>

                    <Text style={styles.title}>Sexe</Text>

                  </View >
                  <Body style={styles.infoPosition}>
                    <ListItem style={{ flexDirection: "reverse", borderColor: "#1e3d42" }}>
                      <CheckBox checked={this.state.check1} color="#20554f" name='Sexe' id='male' onPress={this.handleCheck1} />
                      <Text style={styles.label}>Male</Text>
                    </ListItem>
                    <ListItem style={{ flexDirection: "reverse", borderColor: "#1e3d42" }}>
                      <CheckBox checked={this.state.check3} color="#20554f" name='Sexe' id='hongre' onPress={this.handleCheck3} />
                      <Text style={styles.label}>Hongre</Text>
                    </ListItem>
                    <ListItem style={{ flexDirection: "reverse", borderColor: "#1e3d42" }}>
                      <CheckBox checked={this.state.check2} color="#20554f" name='Sexe' id='femelle' onPress={this.handleCheck2} />
                      <Text style={styles.label}>Femelle</Text>
                    </ListItem>
                  </Body>
                </View>
              </Body>
            </CardItem>
          </Card>
          <Card style={{ width: "100%" }}>
            <CardItem style={{ backgroundColor: '#1e3d42' }}>
              <Body  >
                <View style={{ width: "100%", height: 60 }}>

                  <View style={styles.sexePosition}>

                    <Text style={styles.title}>Type</Text>

                  </View >
                  <Body style={styles.infoPosition}>
                    <ListItem style={{ flexDirection: "reverse", borderColor: "#1e3d42" }}>
                      <CheckBox checked={this.state.competition} color="#20554f" name='Type' id='competition' onPress={this.handleCompetition} />
                      <Text style={styles.label}>Competition</Text>
                    </ListItem>
                    <ListItem style={{ flexDirection: "reverse", borderColor: "#1e3d42" }}>
                      <CheckBox checked={this.state.elevage} color="#20554f" name='Type' id='elevage' onPress={this.handleElevage} />
                      <Text style={styles.label}>Elevage</Text>
                    </ListItem>
                  </Body>
                </View>
              </Body>
            </CardItem>
          </Card>
          <Button style={{ backgroundColor: '#20554f', justifyContent: 'center', marginBottom: 2, marginTop : 15 }} onPress={this.getFiltredHorses}><Text>Filtrer</Text></Button>
        </View>
      </LinearGradient>
    );
  };



  //------------- DEBUT du render -------------------//

  render() {
    let FiltredHORSES = this.state.filtredHorses;
    return (
      <Container style={{ flex: 1 }}>

        {/* ----------------------------------Header---------------------------------- */}
        <LinearGradient colors={['#20554f', '#020506']} style={{ height: 60 }}>
          <View style={{ flex: 1 }}>
            <View style={styles.titlePosition}>
              <Text style={styles.titleText}>{translate("HORSE_TITLE", this.props.Locale)}</Text>
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

        <Button rounded style={styles.filterButton}
          onPress={this.toggleOpen}>
          <FontAwesome style={{ color: 'white', marginHorizontal: 13 }} size={30} name='binoculars' />
        </Button>

        <LinearGradient colors={['#1e3d42', '#020506']} style={{ height: 70, flex: 8 }}>
          <View>
            <View style={this.state.verrouillageBackScreen}>
              <MenuDrawer
                style={{ zIndex: 1 }}
                open={this.state.open}
                drawerContent={this.drawerContent()}
                drawerPercentage={65}
                animationTime={150}
                overlay={true}
                opacity={1}
                captureGestures={true} />


              {/* User connection */}

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
                          <Text style={styles.info}>{translate("LOGOUT", this.props.Locale)}</Text>
                        </Button>
                      </View>
                    </LinearGradient>

                  </View>
                </TouchableOpacity>
              </Modal>
            </View>




            <ScrollView scrollEnabled={this.state.allowVerticalScroll}>
              <View style={styles.viewSort}>
                <Button bordered dark style={styles.ajoutRecent} onPress={this.sortByRecent}>
                  <Text style={styles.text}>{translate("RECENT", this.props.Locale)}</Text>
                </Button>
                <Button bordered dark style={styles.mostView} onPress={this.sortByView}>
                  <Text style={styles.text}>{translate("VIEW", this.props.Locale)}</Text>
                </Button>
              </View>



              {this.state.sort === null ?
                (<_HorseList navigation={this.props.navigation} />) :
                (this.state.sort === 'filter' ?
                  (FiltredHORSES.length > 0 ? (
                    <FlatList
                      data={FiltredHORSES}
                      renderItem={({ item, index }) => <_Horse navigation={this.props.navigation} horse={item} index={index} />}
                      keyExtractor={item => item.id.toString()} />)
                    : (
                      <View style={{ marginTop: height / 2 - 100 }}>
                        <Text style={{ textAlign: 'center', color: 'white', fontSize: 20, fontWeight: "600", }}>{translate("NO_HORSE_MATCH", this.props.Locale)}</Text>
                      </View>
                    )
                  ) :
                  (this.state.sort === 'view' ?
                    (<FlatList
                      data={FiltredHORSES}
                      renderItem={({ item, index }) => <_Horse navigation={this.props.navigation} horse={item} index={index} />}
                      keyExtractor={item => item.id.toString()} />) :
                    (
                      <FlatList
                        data={FiltredHORSES}
                        renderItem={({ item, index }) => <_Horse navigation={this.props.navigation} horse={item} index={index} />}
                        keyExtractor={item => item.id.toString()} />
                    )))}
            </ScrollView>
          </View>
        </LinearGradient>


        {/* ----------------------------------Nav Menu---------------------------------- */}


        <LinearGradient colors={['#20554f', '#020506']} style={{ height: 70 }}>
          <FooterTab>
            <Button vertical onPress={() => this.props.navigation.navigate('News')}>
              <AntDesign style={{ color: 'white' }} size={30} name="like1" />
              <Text style={styles.text}>{translate("NEWS_TITLE", this.props.Locale)}</Text>
            </Button>
            <Button vertical active onPress={() => this.props.navigation.navigate('Horses')}>
              <MaterialCommunityIcons style={{ color: '#20554f' }} size={30} name="trophy" />
              <Text style={{ color: '#20554f', fontSize: 9 }}>{translate("HORSE_TITLE", this.props.Locale)}</Text>
            </Button>
            <Button vertical onPress={() => this.props.navigation.navigate('Annonces')}>
              <MaterialCommunityIcons style={{ color: 'white' }} size={30} name="horseshoe" />
              <Text style={styles.text}>{translate("ANNONCE_TITLE", this.props.Locale)}</Text>
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
  sliderBar: {
    backgroundColor: '#20554f'
  },
  selectedBar: {
    backgroundColor: '#39968C'

  },
  label: {
    color: 'white',
    fontSize: 12,
    marginTop: 6
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    margin: 'auto',
    marginTop: -2,
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
    marginTop: 20,
    marginBottom: 74,
    padding: 10,
    paddingBottom: 20
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
  }, filterButton: {
    zIndex: 1,
    position: 'absolute',
    elevation: 10,
    width: width * 0.15,
    height: height * 0.08,
    marginLeft: width * 0.82,
    marginRight: width * 0.025,
    marginTop: 65,
    backgroundColor: '#20554f'
  }

})



const mapStateToProps = ({ auth, locale }) => {
  const { connected, idUser, email, password, userName } = auth;
  const { Locale } = locale;

  return { connected, idUser, email, password, userName, Locale };
};


export default
  connect(mapStateToProps, { UserLogout, ChangeLocale })(Horses);

