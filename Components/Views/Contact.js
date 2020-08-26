import React, { Component } from 'react';
import { MaterialCommunityIcons, Entypo, AntDesign } from '@expo/vector-icons';
import { FooterTab, Button, View, Item, Input, Icon, Toast, Container } from 'native-base';
import { StyleSheet, Image, TextInput, TouchableOpacity, Text, CameraRoll, ScrollView, Modal, TouchableHighlight, Dimensions } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { UserAuthentification, UserLogout } from "./../../Redux/auth/actions";
import { SendFormulaire } from "./../../Services/auth";
import { ChangeLocale } from './../../Redux/locale/actions';
import { connect } from "react-redux";
import { LinearGradient } from 'expo-linear-gradient';
import { translate } from "./../../Locale/local";
const { width, height } = Dimensions.get('window')

class Contact extends Component {
  _isMounted = false;
  constructor(props) {
    super(props)
    this.state = {

      buttonAnnonceStyle: { marginTop: 20, backgroundColor: '#1e3d42', justifyContent: 'center', width: width / 2 - 50 },
      buttonQuestionStyle: { marginTop: 20, backgroundColor: '#20554f', justifyContent: 'center', width: width / 2 - 50 },
      id_user: this.props.idUser,
      type: 'question',
      title: '',
      description: '',
      price: 0,
      photo: null,
      getPhoto: false,
      modalVisible: false,
      index: null,
      selectedPicture1: null,
      selectedPicture2: null,
      selectedPicture3: null,
      SelPicture: null,
      modalVisibleConnexion: false,
      UserEmail: '',
      UserPassword: '',
      UserInfoOpen: false
    }
  }

  componentDidMount() {
    this._isMounted === true;
  }

  componentWillUnmount() {
    this._isMounted === false;
  }


  SwitchFormToAnnonce = () => {
    this._isMounted === true;
    if (this.state.type === 'question') {
      this.setState({
        type: 'annonce',
        title: '', description: '',
        buttonAnnonceStyle: { marginTop: 20, backgroundColor: '#20554f', justifyContent: 'center', width: width / 2 - 50 },
        buttonQuestionStyle: { marginTop: 20, backgroundColor: '#1e3d42', justifyContent: 'center', width: width / 2 - 50 }
      })
    }
  }

  SwitchFormToQuestion = () => {
    this._isMounted === true;
    if (this.state.type === 'annonce') {
      this.setState({
        type: 'question',
        title: '',
        description: '',
        buttonAnnonceStyle: { marginTop: 20, backgroundColor: '#1e3d42', justifyContent: 'center', width: width / 2 - 50 },
        buttonQuestionStyle: { marginTop: 20, backgroundColor: '#20554f', justifyContent: 'center', width: width / 2 - 50 }
      })
    }
  }


  SendForm = async () => {
    this._isMounted === true;
    if (this.props.connected === true) {

      let { id_user, type, title, description, price, selectedPicture1, selectedPicture2, selectedPicture3 } = this.state

      if (this.state.type === 'question') {
        this.setState({ price: 0 })
      }

      console.log('YOYOYOYOY', id_user)
      var Annonce = new FormData();

      Annonce.append(
        'picture1', {
        uri: selectedPicture1,
        type: 'image/png',
        name: 'image1',
      })
      if (this.state.selectedPicture2 !== null) {
        Annonce.append(
          'picture2', {
          uri: selectedPicture2,
          type: 'image/png',
          name: 'image2',
        })
      }
      if (this.state.selectedPicture3 !== null) {
        Annonce.append(
          'picture3', {
          uri: selectedPicture3,
          type: 'image/png',
          name: 'image3',
        })
      }

      Annonce.append(
        'id_user', id_user)
      Annonce.append(
        'type', type)
      Annonce.append(
        'title', title)
      Annonce.append(
        'description', description)
      Annonce.append(
        'price', price)


      SendFormulaire(Annonce)

      this.setState({ title: '', description: '', price: '', selectedPicture1: null, selectedPicture2: null, selectedPicture3: null });
      alert('Your message have been send !')
    } else {
      this.setState({ modalVisibleConnexion: !this.state.modalVisibleConnexion });
    }
  }


  toggleModal = () => {
    this._isMounted === true;
    this.setState({ modalVisible: !this.state.modalVisible });
    if (this.state.modalVisible === false) {
      CameraRoll.getPhotos({
        first: 50,
        assetType: 'Photos',
        groupTypes: 'All'
      })
        .then(r => {
          this.setState({ photos: r.edges });
        })
        .catch((err) => {
          console.log(err)
          //Error Loading Images
        });
    }
  }

  setIndex = (index, picture) => {

    if (this.state.selectedPicture1 === null) {
      this.setState({ index, modalVisible: false, selectedPicture1: picture.node.image.uri });
    } else if (this.state.selectedPicture2 === null) {
      this.setState({ index, modalVisible: false, selectedPicture2: picture.node.image.uri });
    } else {
      this.setState({ index, modalVisible: false, selectedPicture3: picture.node.image.uri });
    }
  }

  //------------------------Connexion-----------------------//

  login = () => {
    this._isMounted === true;

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
        text: "Please enter your password.",
        duration: 3000,
        position: "top",
        type: "warning"
      })
    }
    else {
      const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (reg.test(UserEmail) === true) {
        this.props.UserAuthentification(UserEmail, UserPassword);
        setTimeout(() => {

          if (this.props.connected !== true) {
            Toast.show({
              text: "There is a problem, please verify your conexion information",
              duration: 3000,
              position: "top",
              type: "danger"
            })
          }
          else if (this.props.connected === true) {
            this.setState({ modalVisibleConnexion: !this.state.modalVisibleConnexion });
          }
        }, 800)
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

  UserInfos = () => {
    if (this.props.connected !== true) {
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

  setConnexionModalVisible = () => {
    if (this.props.connected !== true) {
      this.setState({ modalVisibleConnexion: !this.state.modalVisibleConnexion });

    }
  }


  render() {
    return (
      <Container style={{ flex: 1 }}>

        {/* ----------------------------------Header---------------------------------- */}


        <LinearGradient colors={['#20554f', '#020506']} style={{ height: 60 }}>
          <View style={{ flex: 1 }}>
            <View style={styles.titlePosition}>
              <Text style={styles.titleText}>Contact</Text>

            </View>
          </View>

        </LinearGradient>

        <Image style={{ width: 60, height: 60, position: 'absolute', top: 20, flex: 1, left: 20, zIndex: 1 }}
          source={require('./../images/logo.png')} />

        <Button transparent style={{ position: 'absolute', right: 10, top: 20 }}
          onPress={() => this.UserInfos()}>
          {this.props.connected === true ?
            (<Text style={{ color: 'white', marginBottom: 10, fontSize: 16, marginRight: 15 }}>{this.props.userName}</Text>)
            : (<AntDesign style={{ color: 'white' }} size={30} name='adduser' />)}
        </Button>


        {/* ----------------------------------Content---------------------------------- */}
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
        <LinearGradient colors={['#1e3d42', '#020506']} style={{ height: 70, flex: 8 }}>
          {/*---------- Modal connexion -------------*/}
          <Modal
            animationType="fade"
            transparent={true}
            visible={this.state.modalVisibleConnexion}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
            }}>
            <View style={{ height: height, width: width, backgroundColor: 'rgba(0,0,0,0.8)' }}>
              <View style={{ height: height / 2, width: width * 0.8, backgroundColor: '#1e3d42', justifyContent: 'center', padding: 50, marginHorizontal: width * 0.1, marginTop: height / 4, borderRadius: 5 }}>
                <TouchableOpacity onPress={() => this.setConnexionModalVisible()} style={{ position: 'absolute', top: 5, right: 5 }}>
                  <AntDesign style={{ color: 'white' }} size={25} name="closecircleo" />
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={styles.textConnexion}>Veuillez vous connecter.</Text>
                </View>
                <View style={{ display: 'flex', justifyContent: 'space-around', padding: 'auto' }}>
                  <Item rounded style={styles.input}>
                    <Input style={styles.textInput} placeholder='Email'
                      onChangeText={UserEmail => this.setState({ UserEmail })} />
                  </Item>

                  <Item rounded style={styles.input}>
                    <Input style={styles.textInput} password placeholder='Password'
                      onChangeText={UserPassword => this.setState({ UserPassword })} />
                  </Item>

                  <Button block style={styles.button} onPress={() => this.login()}>

                    <Text style={styles.textConnexion}> Se Connecter </Text>
                  </Button>
                  <Button block style={styles.button} onPress={() => this.props.navigation.navigate('Register')}>
                    <Text style={styles.textConnexion}> S'inscrire </Text>
                    <Icon color="black"
                      size={15} name='ios-arrow-forward' />
                  </Button>
                </View>

              </View>
            </View>
          </Modal>



          {/*---------- Modal photo galerie -------------*/}
          <Modal
            animationType={"slide"}
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => console.log('closed')}
          >
            <View style={styles.modalContainer}>
              <Button
                style={{ justifyContent: 'center', backgroundColor: '#20554f' }}
                onPress={this.toggleModal}>
                <Text style={{ color: 'white', fontSize: 20 }}>Close</Text>
              </Button>
              <ScrollView
                contentContainerStyle={styles.scrollContainer}>
                {
                  this.state.photos !== undefined && this.state.photos.map((picture, key) => {
                    return (

                      <TouchableHighlight
                        // style={{ opacity: key === this.state.index ? 0.5 : 1 }}
                        key={key}
                        underlayColor='transparent'
                        onPress={() => this.setIndex(key, picture)}>
                        <Image
                          style={{
                            width: width / 3,
                            height: width / 3
                          }}
                          source={{ uri: picture.node.image.uri }}
                        />
                      </TouchableHighlight>

                    )
                  })
                }
              </ScrollView>
            </View>
          </Modal>

          {/* ------------------Page contact----------- */}

          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }} >
            <Button style={this.state.buttonQuestionStyle} onPress={this.SwitchFormToQuestion}><Text style={{ color: 'white', fontSize: 15, }}>{translate("QUESTION", this.props.Locale)}</Text></Button>
            <Button style={this.state.buttonAnnonceStyle} onPress={this.SwitchFormToAnnonce}><Text style={{ color: 'white', fontSize: 15 }}>{translate("ANNONCE_TITLE", this.props.Locale)}</Text></Button>
          </View>

          {this.state.type === 'question' ?
            // --------------------Envoi de question-------------------
            (<View>
              <TextInput
                value={this.state.title}
                onChangeText={title => this.setState({ title })}
                style={{ height: 30, backgroundColor: 'white', marginTop: 40, marginHorizontal: 40, borderRadius: 5 }}
                placeholder={translate("TITLE_ANSWER", this.props.Locale)} />
              <TextInput
                value={this.state.description}
                onChangeText={description => this.setState({ description })}
                style={{ height: 250, backgroundColor: 'white', marginHorizontal: 40, marginTop: 10, borderRadius: 5 }}
                placeholder={translate("ASK_ANSWER", this.props.Locale)} />
              <Button onPress={this.SendForm} style={{ height: 50, backgroundColor: '#20554f', marginHorizontal: 40, marginTop: 10, justifyContent: 'center', backgroundColor: '#20554f' }}>
                <Text style={{ color: 'white', fontSize: 20 }} >
                  {translate("SEND", this.props.Locale)}
                </Text>
              </Button></View>)

            // --------------------Envoi d'Annonce-------------------
            : (<View style={{ display: 'flex', flexDirection: 'column' }}>
              <View style={{ display: 'flex', flexDirection: 'row' }}>
                <View>
                  <TextInput
                    value={this.state.title}
                    onChangeText={title => this.setState({ title })}
                    style={{ height: 30, backgroundColor: 'white', marginTop: 20, marginLeft: 40, borderRadius: 5, width: width / 3 }}
                    placeholder={translate("ANNONCE_TITLE", this.props.Locale)} />
                  <TextInput
                    onChangeText={price => this.setState({ price })}
                    style={{ height: 30, backgroundColor: 'white', marginLeft: 40, marginTop: 10, borderRadius: 5, width: width / 3 }}
                    placeholder={translate("PRICE", this.props.Locale)} />
                </View>
                {this.state.selectedPicture1 === null ?
                  (<Button style={{ marginTop: 40, marginLeft: 5, width: width / 7, height: width / 7, justifyContent: 'center', backgroundColor: '#20554f' }}
                    onPress={this.toggleModal}>
                    <Text style={{ color: 'white', fontSize: 30 }}>+</Text>
                  </Button>)
                  : (<TouchableHighlight
                    onPress={this.toggleModal}>
                    <Image
                      style={{ marginTop: 40, marginLeft: 5, width: width / 7, height: width / 7, justifyContent: 'center', backgroundColor: '#20554f' }}
                      source={{ uri: this.state.selectedPicture1 }}
                    /></TouchableHighlight>)}
                {this.state.selectedPicture2 === null ?
                  (<Button style={{ marginTop: 40, marginLeft: 5, width: width / 7, height: width / 7, justifyContent: 'center', backgroundColor: '#20554f' }}
                    onPress={this.toggleModal}>
                    <Text style={{ color: 'white', fontSize: 30 }}>+</Text>
                  </Button>)
                  : (<TouchableHighlight
                    onPress={this.toggleModal}>
                    <Image
                      style={{ marginTop: 40, marginLeft: 5, width: width / 7, height: width / 7, justifyContent: 'center', backgroundColor: '#20554f' }}
                      source={{ uri: this.state.selectedPicture2 }}
                    /></TouchableHighlight>)}
                {this.state.selectedPicture3 === null ?
                  (<Button style={{ marginTop: 40, marginLeft: 5, width: width / 7, height: width / 7, justifyContent: 'center', backgroundColor: '#20554f' }}
                    onPress={this.toggleModal}>
                    <Text style={{ color: 'white', fontSize: 30 }}>+</Text>
                  </Button>)
                  : (<TouchableHighlight
                    onPress={this.toggleModal}>
                    <Image
                      style={{ marginTop: 40, marginLeft: 5, width: width / 7, height: width / 7, justifyContent: 'center', backgroundColor: '#20554f' }}
                      source={{ uri: this.state.selectedPicture3 }}
                    /></TouchableHighlight>)}

              </View>
              <TextInput
                value={this.state.description}
                onChangeText={description => this.setState({ description })}
                style={{ height: 250, backgroundColor: 'white', marginHorizontal: 40, marginTop: 10, borderRadius: 5 }}
                placeholder={translate("ANNONCE_CONTENT", this.props.Locale)} />

              <Button onPress={() => this.SendForm()} style={{ height: 50, backgroundColor: '#20554f', marginHorizontal: 40, marginTop: 10, justifyContent: 'center' }}>
                <Text style={{ color: 'white', fontSize: 20 }}>{translate("SEND", this.props.Locale)}</Text>
              </Button>

            </View>)}
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
            <Button vertical active onPress={() => this.props.navigation.navigate('Contact')}>
              <Entypo style={{ color: '#20554f' }} size={30} name="mail" />
              <Text style={{ color: '#20554f', fontSize: 9 }}>{translate("CONTACT_TITLE", this.props.Locale)}</Text>
            </Button>
            <Button vertical onPress={() => this.props.navigation.navigate('Favoris')}>
              <AntDesign style={{ color: 'white' }} size={30} name="hearto" />
              <Text style={styles.text}>{translate("FAVORIS_TITLE", this.props.Locale)}</Text>
            </Button>
          </FooterTab>
        </LinearGradient>
      </Container>
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
  modalContainer: {
    paddingTop: 20,
    flex: 1,
    backgroundColor: '#20554f'
  },
  scrollContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  connexion: {
    backgroundColor: '#1e3d42',
    flex: 40,
    alignItems: 'center'
  },
  input: {
    backgroundColor: 'white',
    width: 200,
    height: 40,
    marginTop: 15,
  },
  button: {
    marginTop: 15,
    width: 200,
    height: 45,
    justifyContent: 'center',
    backgroundColor: '#020506'
  },
  textConnexion: {
    fontSize: 17,
    color: 'white'
  },
  textInput: {
    fontSize: 20
  }
})


const mapStateToProps = ({ auth, locale }) => {
  const { connected, idUser, userName } = auth;
  const { Locale } = locale;
  return { connected, idUser, userName, Locale };
};


export default
  connect(mapStateToProps, { UserAuthentification, UserLogout, ChangeLocale })(Contact);
