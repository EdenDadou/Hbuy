import React, { Component } from 'react';
import { MaterialCommunityIcons, Entypo, AntDesign } from '@expo/vector-icons';
import { Container, Text, FooterTab, Button, View, Item, Input, Icon, Toast } from 'native-base';
import { StyleSheet, Image, ScrollView, TouchableOpacity, Dimensions, TextInput, Modal, ActivityIndicator } from 'react-native'
import { UserAuthentification, UserLogout } from "./../../../../Redux/auth/actions";
import { ChangeLocale } from './../../../../Redux/locale/actions';
import { WebView } from 'react-native-webview';
import { askInfoHorse, incrementView, isFavorite, addFavorite, deleteFavorite } from './../../../../Services/horses';
import { LinearGradient } from 'expo-linear-gradient';
import { Divider } from 'react-native-elements';
import { connect } from "react-redux";
import ImageViewer from 'react-native-image-zoom-viewer';
import { translate } from "./../../../../Locale/local";
const { width, height } = Dimensions.get('window');


class _HorseView extends Component {
    _isMounted = false;
    constructor(props) {
        super(props)
        this.state = {
            isFavorite: null,
            modalVisible: false,
            modalVisibleConnexion: false,
            demande: '',
            imageViewerOpen: false,
            UserEmail: '',
            UserPassword: '',
            mainPicture: this.getHorseImage(this.props.HorseItem.name),
            Picture1: this.getHorseImage1(this.props.HorseItem.name),
            Picture2: this.getHorseImage2(this.props.HorseItem.name),
            Picture3: this.getHorseImage3(this.props.HorseItem.name),
            Picture4: this.getHorseImage4(this.props.HorseItem.name),
            Picture5: this.getHorseImage5(this.props.HorseItem.name),
            Picture6: this.getHorseImage6(this.props.HorseItem.name),

            UserInfoOpen: false,

        }
    }

    componentDidMount() {
        this._isMounted = true;
        let id_user = this.props.idUser;
        let id_horse = null;
        if (this.props.HorseItem.id_user === undefined) {
            id_horse = this.props.HorseItem.id;
        } else {
            id_horse = this.props.HorseItem.id_horse;
        }

        //getFavorite
        if (this.props.connected === true) {
            isFavorite(id_user, id_horse)
                .then((responseJson) => {
                    this.setState({ isFavorite: responseJson.data })
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        //Increment view
        incrementView(id_horse);

    }


    componentWillUnmount() {
        this._isMounted = false;
    }

    getHorseImage = (name) => {
        return 'http://www.h-buy.fr/h_pic/' + name + '/main'
    }
    getHorseImage1 = (name) => {
        return 'http://www.h-buy.fr/h_pic/' + name + '/1'
    }
    getHorseImage2 = (name) => {
        return 'http://www.h-buy.fr/h_pic/' + name + '/2'
    }
    getHorseImage3 = (name) => {
        return 'http://www.h-buy.fr/h_pic/' + name + '/3'
    }
    getHorseImage4 = (name) => {
        return 'http://www.h-buy.fr/h_pic/' + name + '/4'
    }
    getHorseImage5 = (name) => {
        return 'http://www.h-buy.fr/h_pic/' + name + '/5'
    }
    getHorseImage6 = (name) => {
        return 'http://www.h-buy.fr/h_pic/' + name + '/6'
    }

    AddFavorite = () => {
        this._isMounted = true;
        let id_user = this.props.idUser;
        let id_horse = null;
        if (this.props.HorseItem.id_user === undefined) {
            id_horse = this.props.HorseItem.id;
        } else {
            id_horse = this.props.HorseItem.id_horse;
        }
        if (this.props.connected === 'false') {
            this.setState({ modalVisibleConnexion: !this.state.modalVisibleConnexion });
        } else {
            this.setState({ isFavorite: 'true' })
            addFavorite(id_user, id_horse)

        }
    }

    DeleteFavorite = () => {
        this._isMounted = true;
        this.setState({ isFavorite: 'false' })
        let id_user = this.props.idUser;
        let id_horse = null;
        if (this.props.HorseItem.id_user === undefined) {
            id_horse = this.props.HorseItem.id;
        } else {
            id_horse = this.props.HorseItem.id_horse;
        }
        deleteFavorite(id_user, id_horse)
    }

    askInfo = () => {
        this._isMounted = true;
        let demande = this.state.demande;
        let id_user = this.props.idUser;
        let id_horse = this.props.HorseItem.id;
        if (demande !== '') {
            askInfoHorse(id_user, id_horse, demande)
            this.setState({ modalVisible: false, demande: '' });
        } else {
            alert('Your message is empty')
        }

    }

    setModalVisible = () => {
        if (this.props.connected === 'false') {
            this.setState({ modalVisibleConnexion: !this.state.modalVisibleConnexion });
        } else {
            this.setState({ modalVisible: !this.state.modalVisible });
        }
    }

    setImagesViewerVisible = () => {
        this.setState({ imageViewerOpen: !this.state.imageViewerOpen });
    }

    setConnexionModalVisible = () => {
        this.setState({ modalVisibleConnexion: !this.state.modalVisibleConnexion });
    }

    UserInfos = () => {
        if (this.props.connected !== true) {
            this.props.navigation.navigate('Connexion')
        } else {
            this.setState({ UserInfoOpen: !this.state.UserInfoOpen });
        }
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


    render() {
        let Horse = this.props.HorseItem;
        let videoURL = 'https://www.youtube.com/embed/' + this.props.HorseItem.youtube
        let palmares = Horse.palmares.split(' - ')
        let palmaresSize = (palmares.length / 4) * 47
        let HorseDescription = Horse.description.split('<br />')
        const images = [
            { url: this.state.mainPicture },
            { url: this.state.Picture1 },
            { url: this.state.Picture2 },
            { url: this.state.Picture3 },
            { url: this.state.Picture4 },
            { url: this.state.Picture5 },
            { url: this.state.Picture6 }
        ]

        return (
            <Container style={{ flex: 1 }}>

                {/* ----------------------------------Header---------------------------------- */}
                <LinearGradient colors={['#20554f', '#020506']} style={{ height: 60 }}>
                    <View style={{ flex: 1 }}>
                    </View>
                </LinearGradient>

                <Image style={{ width: 60, height: 60, position: 'absolute', top: 20, flex: 1, left: 20, zIndex: 1 }}
                    source={require('./../../../images/logo.png')} />

                <Button transparent style={{ position: 'absolute', right: 10, top: 20 }}
                    onPress={() => this.UserInfos()}>
                    {this.props.connected === true ?
                        (<Text style={{ color: 'white', marginBottom: 10, fontSize: 16 }}>{this.props.userName}</Text>)
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

                {/* ------------------Modal Contact------------------- */}

                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                    }}>
                    <View style={{ height: height, width: width, backgroundColor: 'rgba(0,0,0,0.8)' }}>
                        <View style={{ height: height / 3, width: width * 0.8, backgroundColor: '#1e3d42', justifyContent: 'center', padding: 30, marginHorizontal: width * 0.1, marginTop: height / 4, borderRadius: 5 }}>
                            <View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ color: 'white', marginBottom: 15, fontSize: 15 }}>Ce cheval vous interesse</Text>
                                    <TouchableOpacity onPress={this.setModalVisible} style={{ position: 'flex-end' }}>
                                        <AntDesign style={{ color: 'white' }} size={25} name="closecircleo" />
                                    </TouchableOpacity>
                                </View>
                                <TextInput
                                    style={{ color: 'black', marginBottom: 15, backgroundColor: 'white', height: 100, padding: 5, borderColor: 'black', borderWidth: 1 }}
                                    multiline={true}
                                    onChangeText={demande => this.setState({ demande: demande })}
                                    placeholder={"Bonjour, je suis interessé par ce cheval, j'aimerais etre recontacté"}
                                ></TextInput>
                                <Button style={{ backgroundColor: '#20554f', justifyContent: 'center' }} onPress={this.askInfo}><Text style={{ fontWeight: 'bold' }}>Envoyer</Text></Button>
                            </View>
                        </View>
                    </View>
                </Modal>

                {/* ------------------Modal Connexion------------------- */}

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

                <Modal visible={this.state.imageViewerOpen} transparent={true}>
                    <ImageViewer
                        imageUrls={images}
                        loadingRender={() => { <ActivityIndicator /> }}
                        onSwipeDown={this.setImagesViewerVisible}
                        enableSwipeDown={true} />
                </Modal>


                {/* --------------------------Vue cheval---------------------- */}
                <LinearGradient colors={['#1e3d42', '#020506']} style={{ height: 70, flex: 8 }}>
                    <ScrollView>

                        <View style={{ backgroundColor: '#1e3d42', flexDirection: 'column' }}>
                            <View style={{ flexDirection: 'row', marginTop: 10, marginBottom: 10 }}>

                                {/* ------------Info Horse------------ */}

                                <Image
                                    style={styles.image}
                                    source={{ uri: this.state.mainPicture }}
                                />
                                {Horse.country === 'France' &&
                                    <Image
                                        style={{ height: 30, width: 30, position: 'absolute', top: 14, flex: 1, left: 184, zIndex: 1 }}
                                        source={require('./../../../images/french.png')}
                                    />}

                                <View style={styles.content_container}>
                                    <View style={styles.header_container}>
                                        <Text style={styles.name}>{Horse.name}</Text>
                                    </View>
                                    <View style={styles.infos_container}>
                                        <Text style={styles.description_text} >{this.props.locale === 'fr' ? ([Horse.sex]) : (translate([Horse.sex], this.props.Locale))}</Text>
                                        <Text style={styles.description_text} >{Horse.race}</Text>
                                        <Text style={styles.description_text} >{Horse.age}{translate("AGE", this.props.Locale)}</Text>
                                        <Text style={styles.description_text} >{Horse.height}cm</Text>
                                        <Text style={styles.description_text} >{Horse.qualification}</Text>
                                        {this.state.isFavorite === 'true' ?
                                            (<TouchableOpacity style={{ width: 40, marginTop: 5 }} onPress={this.DeleteFavorite}>
                                                <AntDesign style={{ color: 'red' }} size={30} name="heart" />
                                            </TouchableOpacity>)
                                            : (<TouchableOpacity style={{ width: 40, marginTop: 5 }} onPress={this.AddFavorite}>
                                                <AntDesign style={{ color: 'red' }} size={30} name="hearto" />
                                            </TouchableOpacity>)}



                                    </View>
                                </View>
                            </View>

                            {/* ------------Description------------ */}

                            <View style={{ flex: 1 }}>
                                <Divider style={{ backgroundColor: 'white' }} />

                                {HorseDescription.map(function (item, key) {
                                   return <Text style={styles.description} key={key}>{item}</Text>
                                })}

                   
                                <Divider style={{ backgroundColor: 'white' }} />
                            </View>

                            {/* ------------Photos------------ */}

                            <View>
                                <ScrollView horizontal={true} style={{ marginHorizontal: 8, marginVertical: 40 }}>
                                    <TouchableOpacity onPress={this.setImagesViewerVisible}>
                                        <Image
                                            style={styles.image2}
                                            source={{ uri: this.state.mainPicture, cache: 'force-cache' }}
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={this.setImagesViewerVisible}>
                                        <Image
                                            style={styles.image2}
                                            source={{ uri: this.state.Picture1, cache: 'force-cache' }}

                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={this.setImagesViewerVisible}>
                                        <Image
                                            style={styles.image2}
                                            source={{ uri: this.state.Picture2, cache: 'force-cache' }}
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={this.setImagesViewerVisible}>
                                        <Image
                                            style={styles.image2}
                                            source={{ uri: this.state.Picture3, cache: 'force-cache' }}
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={this.setImagesViewerVisible}>
                                        <Image
                                            style={styles.image2}
                                            source={{ uri: this.state.Picture4, cache: 'force-cache' }}
                                        />
                                    </TouchableOpacity>
                                    {this.state.Picture5 !== null  && <TouchableOpacity onPress={this.setImagesViewerVisible}>
                                        <Image
                                            style={styles.image2}
                                            source={{ uri: this.state.Picture5, cache: 'force-cache' }}
                                        />
                                    </TouchableOpacity>}
                                    {this.state.Picture6 !== null  && <TouchableOpacity onPress={this.setImagesViewerVisible}>
                                        <Image
                                            style={styles.image2}
                                            source={{ uri: this.state.Picture6, cache: 'force-cache' }}
                                        />
                                    </TouchableOpacity>}
                                </ScrollView>
                            </View>

                            {/* ------------Palmares------------ */}

                            <Divider style={{ backgroundColor: 'white', marginBottom: 5 }} />
                            <View style={{
                                display: 'flex',
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                                alignItems:'center',
                                height: palmaresSize,
                            }}>
                                {palmares.map(function (item, i) {
                                    if (i % 4 === 1) {
                                        return <Text key={i} style={styles.palmares2}>{item}</Text>
                                    } else if (i % 4 === 3) {
                                        return <Text key={i} style={styles.palmares3}>{item}</Text>
                                    } else if (i === 0) {
                                        return <Text key={i} style={styles.palmares1}>{item}</Text>
                                    } else {
                                        return <Text key={i} style={styles.palmares}>{item}</Text>
                                    }

                                })}

                            </View>
                            <Divider style={{ backgroundColor: 'white', marginTop: 5 }} />


                            {/* ------------Pedigre------------ */}

                            <View style={{ flexDirection: 'row', }} >
                                <View style={{ justifyContent: 'center', flexDirection: 'column', width: width / 3, height: 300 }}>
                                    <Text style={styles.pedigreText}>{Horse.name}</Text>
                                </View>
                                <View style={{ justifyContent: 'space-around', flexDirection: 'column', width: width / 3, height: 300 }}>
                                    <Text style={styles.pedigreTextP}>{Horse.father}</Text>
                                    <Text style={styles.pedigreTextP}>{Horse.mother}</Text>
                                </View>
                                <View style={{ justifyContent: 'space-around', flexDirection: 'column', width: width / 3, height: 300 }}>
                                    <Text style={styles.pedigreTextGP}>{Horse.pgfather}</Text>
                                    <Text style={styles.pedigreTextGP}>{Horse.pgmother}</Text>
                                    <Text style={styles.pedigreTextGP}>{Horse.mgfather}</Text>
                                    <Text style={styles.pedigreTextGP}>{Horse.mgmother}</Text>
                                </View>
                                <Divider style={{ backgroundColor: 'white', marginTop: 10 }} />
                            </View>

                            {/* ------------Video------------ */}

                            <View style={{ height: 300, marginTop: 10 }}>

                                <WebView
                                    style={{ flex: 1 }}
                                    source={{ uri: videoURL }}
                                />

                                <Divider style={{ backgroundColor: 'white', marginTop: 10 }} />
                            </View>

                            {/* ------------Price------------ */}

                            <View style={{ marginTop: 20, marginBottom: 50, alignItems: 'center' }}>
                                <Text style={{ color: 'white', fontSize: 30, textAlign: 'center', marginBottom: 20 }}>{Horse.price}€</Text>

                                {/* ------------Demande d'info------------ */}

                                <Button
                                    onPress={() => this.setModalVisible()}
                                    style={{ backgroundColor: '#20554f', justifyContent: 'center' }} >
                                    <Text style={{ color: 'white', fontSize: 15 }}>{translate("PROPOSITION", this.props.Locale)}</Text>
                                </Button>
                            </View>

                        </View>
                    </ScrollView>
                </LinearGradient>


                {/* ----------------------------------Nav Menu---------------------------------- */}


                <LinearGradient colors={['#20554f', '#020506']} style={{ height: 70 }}>
                    <FooterTab>
                        <Button vertical onPress={() => this.props.navigation.navigate('News')}>
                            <AntDesign style={{ color: 'white' }} size={30} name="like1" />
                            <Text style={styles.text}>{translate("NEWS_TITLE", this.props.Locale)}</Text>
                        </Button>
                        <Button vertical active onPress={() => this.props.navigation.navigate('Horses')}>
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
                        <Button vertical onPress={() => this.props.navigation.navigate('Favoris')}>
                            <AntDesign style={{ color: 'white' }} size={30} name="hearto" />
                            <Text style={styles.text}>{translate("FAVORIS_TITLE", this.props.Locale)}</Text>
                        </Button>
                    </FooterTab>
                </LinearGradient>
            </Container >
        )
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
    main_container: {
        height: 190,
        flexDirection: 'row'
    },
    image: {
        width: 220,
        height: 220,
        margin: 5,
        borderRadius: 10,
        backgroundColor: 'gray',

    },
    image2: {
        width: 320,
        height: 320,
        flex: 1,
        backgroundColor: 'gray',

    },
    content_container: {
        flex: 1,
        margin: 5
    },
    header_container: {
        flex: 3,
        flexDirection: 'row'
    },
    name: {
        fontWeight: 'bold',
        fontSize: 20,
        flex: 1,
        flexWrap: 'wrap',
        paddingRight: 5,
        color: 'white'
    },
    vote_text: {
        fontWeight: 'bold',
        fontSize: 26,
        color: '#666666'
    },
    infos_container: {
        flex: 7,
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: 10
    },
    description_text: {
        fontStyle: 'italic',
        color: 'white',
        fontSize: 16
    },
    date_text: {
        textAlign: 'right',
        fontSize: 14
    },
    palmares: {
        color: 'white',
        fontSize: 15,
        width: width / 4-10,
        marginLeft: 10,
        marginVertical: 10,
    },
    palmares1: {
        color: 'white',
        fontSize: 15,
        width: width / 4-5,
        height:15,
        marginLeft: 5
    },
    palmares2: {
        color: 'white',
        fontSize: 12,
        width: width / 3-5,
        marginVertical: 10,
        marginLeft:5
    },
    palmares3: {
        color: 'white',
        fontSize: 15,
        width: width / 6,
        marginVertical: 10
    },

    pedigreTextGP: {
        fontSize: 15,
        color: 'white',
        fontWeight: '500',
        backgroundColor: '#0D2B27',

        marginRight: 5,
        marginLeft: 2.5,
        paddingTop: 7,

        width: width / 3 - 5,
        height: 50,

        borderWidth: 0.5,
        borderRadius: 10,
        borderColor: 'white',

        textAlign: 'center',
    },
    pedigreTextP: {
        fontSize: 15,
        color: 'white',
        fontWeight: '500',
        backgroundColor: '#0D2B27',

        marginLeft: 2.5,
        paddingTop: 7,

        width: width / 3 - 5,
        height: 50,

        borderWidth: 0.5,
        borderRadius: 10,
        borderColor: 'white',

        textAlign: 'center',
    },
    pedigreText: {
        fontSize: 15,
        color: 'white',
        fontWeight: '500',
        backgroundColor: '#0D2B27',

        marginLeft: 5,
        paddingTop: 20,

        height: 80,
        width: width / 3 - 5,

        borderWidth: 0.5,
        borderRadius: 10,
        borderColor: 'white',

        textAlign: 'center',
    },
    description: {
        padding: 20,
        color: 'white'
    },
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    connexion: {
        backgroundColor: '#0F332E',
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

const mapStateToProps = ({ auth, horse, locale }) => {
    const { connected, idUser, userName } = auth;
    const { HorseItem } = horse;
    const { Locale } = locale;
    return { connected, idUser, userName, HorseItem, Locale };
};


export default
    connect(mapStateToProps, { UserAuthentification, UserLogout, ChangeLocale })(_HorseView);


