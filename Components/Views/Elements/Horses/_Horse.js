import React, { Component } from 'react';
import { Text, View, Item, Button, Toast, Input, Icon, } from 'native-base';
import { StyleSheet, Image, TouchableOpacity, Dimensions, Modal } from 'react-native';
import { UserAuthentification } from "./../../../../Redux/auth/actions";
import { getHorseItem } from "./../../../../Redux/horse/actions";
import { connect } from "react-redux";
import { translate } from "./../../../../Locale/local";
const { width, height } = Dimensions.get('window');





class _Horse extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modalVisibleConnexion: false,
      UserEmail: '',
      UserPassword: '',
      HorsePicture : null

    }
  }

  componentWillMount = () => {
    let HorseName  =this.props.horse.name;
      this.setState({HorsePicture: 'http://www.h-buy.fr/h_pic/' + HorseName + '/main'})
    
  }

  onPress = () => {
 
    this.props.getHorseItem(this.props.horse)

      this.props.navigation.navigate('HorseView', this.props.HorseItem)

      }
      
      
    
  render() {
    const horse = this.props.horse;
    return (
      <View>

        <TouchableOpacity onPress={this.onPress}>

          <View style={styles.main_container}>
            <Image
              style={styles.image}
              thumbnailSource={{ uri: this.state.HorsePicture + '?w=50&buster=${Math.random()}' }}
              source={{ uri: this.state.HorsePicture + `?w=${width/2}&buster=${Math.random()}`, cache: 'force-cache' }}
            />
            <View style={styles.content_container}>
              <View style={styles.header_container}>
                <Text style={styles.name}>{horse.name}</Text>
              </View>
              <View style={styles.infos_container}>
                <Text style={styles.description_text} >{horse.age}{translate("AGE", this.props.Locale)}</Text>
                <Text style={styles.description_text} >{horse.height} cm</Text>
                <Text style={styles.description_text} >{this.props.locale === 'fr' ? ([horse.sex]):(translate([horse.sex], this.props.Locale))}</Text>
                <Text style={styles.description_text} >{horse.price} €</Text>
              </View>
              <View style={styles.date_container}>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>

    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    height: 190,
    flexDirection: 'row',
    borderColor: '#20554f',
    borderWidth: 0.3,
    backgroundColor: 'rgba(32, 85, 79, 0.15)',
    margin: 3,
    shadowOffset: { width: 5, height: 5, },
    shadowColor: 'black',
    shadowOpacity: 1.0,
  },
  image: {
    width: width/2,
    height: width/2,
    margin: 5,
    backgroundColor: 'gray',
    borderRadius: 20
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
    flex: 7
  },
  description_text: {
    fontStyle: 'italic',
    color: 'white'
  },
  date_container: {
    flex: 1
  },
  date_text: {
    textAlign: 'right',
    fontSize: 14
  }, connexion: {
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


const mapStateToProps = ({ auth,horse, locale  }) => {
  const { connected, idUser } = auth;
  const { loading, Horselist, HorseItem } = horse;
  const { Locale } = locale;
  return { connected, idUser, loading, Horselist, HorseItem , Locale };
};


export default
  connect(mapStateToProps, { UserAuthentification, getHorseItem })(_Horse);
