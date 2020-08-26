import React, { Component } from 'react';
import { MaterialCommunityIcons, Entypo, AntDesign } from '@expo/vector-icons';
import { Container, Text, FooterTab, Button, View, Icon } from 'native-base';
import { StyleSheet, Image, ScrollView, ImageBackground, Modal,ActivityIndicator, TouchableOpacity, Dimensions } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { UserLogout } from './../../../../Redux/auth/actions';
import { ChangeLocale } from './../../../../Redux/locale/actions';
import { translate } from "./../../../../Locale/local";
import ImageViewer from 'react-native-image-zoom-viewer';
import { connect } from "react-redux";
const { width, height } = Dimensions.get('window')


class _AnnoncesView extends Component {
    constructor(props) {
        super(props)
        this.state = {

            UserInfoOpen: false,
            imageViewerOpen : false,
            Picture1 : this.getAnnoncesImage1(this.props.navigation.getParam('title')),
            Picture2 : this.getAnnoncesImage2(this.props.navigation.getParam('title')),
            Picture3 : this.getAnnoncesImage3(this.props.navigation.getParam('title')),
        }
    }



    getAnnoncesImage1(title) {
        return 'http://www.h-buy.fr/a_pic/' + title + '/1'
    }
    getAnnoncesImage2(title) {
        return 'http://www.h-buy.fr/a_pic/' + title + '/2'
    }
    getAnnoncesImage3(title) {
        return 'http://www.h-buy.fr/a_pic/' + title + '/3'
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

    setImagesViewerVisible = () => {
        this.setState({ imageViewerOpen: !this.state.imageViewerOpen });
    }


    render() {

        const { navigation } = this.props;
        const title = navigation.getParam('title');
        const price = navigation.getParam('price');
        const description = navigation.getParam('description');
        const images = [
            { url: this.state.Picture1 },
            { url: this.state.Picture2 },
            { url: this.state.Picture3 },
         
        ]


        return (
            <Container style={{ flex: 1 }}>

                {/* ----------------------------------Header---------------------------------- */}
                <LinearGradient colors={['#20554f', '#020506']} style={{ height: 60 }} />


                <Image style={{ width: 80, height: 80, position: 'absolute', top: 20, flex: 1, left: 20, zIndex: 1 }}
                    source={require('./../../../images/logo.png')} />

                <Button transparent style={{ position: 'absolute', right: 10, top: 20 }}
                    onPress={() => this.UserInfos()}>
                    {this.props.connected === true ?
                        (<AntDesign style={{ color: 'white' }} size={30} name='user' />)
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
                                        {this.props.Locale == 'fr' ?
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


                <Modal visible={this.state.imageViewerOpen} transparent={true}>
                    <ImageViewer
                        imageUrls={images}
                        loadingRender={() => { <ActivityIndicator /> }}
                        onSwipeDown={this.setImagesViewerVisible}
                        enableSwipeDown={true} />
                </Modal>

                <LinearGradient colors={['#1e3d42', '#020506']} style={{ height: 70, flex: 8 }}>
                    <View style={styles.newsView}>
                        <ScrollView>
                            <ImageBackground
                                source={{ uri: this.getAnnoncesImage1(title) }}
                                style={styles.image}>
                                <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.8)']}
                                    style={{ height: height / 3, width: width }}>
                                    <View style={styles.title_container}>
                                        <Text style={styles.title}>{title}</Text>
                                    </View>
                                </LinearGradient>
                            </ImageBackground>

                            <TouchableOpacity style={{ position:'absolute', flexDirection:'row',  top: 30, right: 30 }} onPress={() => this.props.navigation.navigate('Annonces')}>
                                <Icon style={{ color: "white" }}
                                    size={20} name='ios-arrow-back' />
                                <Text style={{ color: 'white', paddingLeft: 10, marginTop: 8 }}>Go back</Text>
                            </TouchableOpacity>
                            <View>
                                <ScrollView horizontal={true} style={{ marginHorizontal: 8, marginVertical: 40 }}>
                                    <TouchableOpacity onPress={this.setImagesViewerVisible}>
                                        <Image
                                            style={styles.image2}
                                            source={{ uri: this.getAnnoncesImage2(title) , cache: 'force-cache' }}
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={this.setImagesViewerVisible}>
                                        <Image
                                            style={styles.image2}
                                            source={{ uri: this.getAnnoncesImage3(title) , cache: 'force-cache' }}
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={this.setImagesViewerVisible}>
                                        <Image
                                            style={styles.image2}
                                            source={{ uri: this.getAnnoncesImage1(title) , cache: 'force-cache' }}
                                        />
                                    </TouchableOpacity>
                                </ScrollView>
                            </View>
                            <Text style={styles.description_text} >{description}</Text>
                            <Text style={styles.price} >{price}€</Text>


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
                        <Button vertical onPress={() => this.props.navigation.navigate('Horses')}>
                            <MaterialCommunityIcons style={{ color: 'white' }} size={30} name="trophy" />
                            <Text style={{ color: 'white', fontSize: 9 }}>{translate("HORSE_TITLE", this.props.Locale)}</Text>
                        </Button>
                        <Button vertical active onPress={() => this.props.navigation.navigate('Annonces')}>
                            <MaterialCommunityIcons style={{ color: '#20554f' }} size={30} name="horseshoe" />
                            <Text style={{ color: '#20554f', fontSize: 9 }}>{translate("ANNONCE_TITLE", this.props.Locale)}</Text>
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
        height: height / 8,
        // width: width*0.9,
        marginTop: height / 3 - 80,
        marginHorizontal: width * 0.05,
    },
    title: {
        fontWeight: '300',
        fontSize: 35,
        flex: 1,
        color: 'white',
        bottom: 10,
        textAlign: 'center',
        zIndex: 1
    },
    description_text: {
        fontStyle: 'italic',
        color: 'white',
        marginHorizontal: width * 0.05,
        marginVertical: height * 0.025,
        textAlign: 'justify',
        fontSize: 18
    },
    date_container: {
        flex: 1
    },
    date_text: {
        textAlign: 'right',
        fontSize: 14
    },
    price: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center'
    },
    image2: {
        width: 320,
        height: 320,
        flex: 1,
        backgroundColor: 'gray',

    }
})


const mapStateToProps = ({ auth, locale }) => {
    const { connected, idUser } = auth;
    const { Locale } = locale;

    return { connected, idUser, Locale };
};


export default
    connect(mapStateToProps, { UserLogout, ChangeLocale })(_AnnoncesView);

