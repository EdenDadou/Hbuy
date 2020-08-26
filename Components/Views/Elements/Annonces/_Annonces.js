import React, { Component } from 'react';
import { Text, View, Item, Button,  } from 'native-base';
import { StyleSheet, Image, ActivityIndicator, TouchableOpacity } from 'react-native'
import { FlatList } from 'react-native-gesture-handler';




export function getAnnoncesImage(title){
    return 'http://www.h-buy.fr/a_pic/'+ title +'/1'
}


class _Annonces extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title:'',
      description: '',
      price: '',
    }
  }

  componentWillMount = () => {
    const annonces= this.props.annonces;
    this.setState({
      title: annonces.title,
      description: annonces.description,
      price: annonces.price,
    })
  }
  onPress = () => {
    const {title, description, price} = this.state
    this.props.navigation.navigate('AnnoncesView', {  title, description, price })
  }

    render(){      
      const annonces= this.props.annonces
      console.log(annonces)
        return (
            <TouchableOpacity  onPress={this.onPress}>
            <View style={styles.main_container}>
            <Image
              style={styles.image}
              source={{uri: getAnnoncesImage(annonces.title)}}
            />
            <View style={styles.content_container}>
              <View style={styles.header_container}>
                <Text style={styles.name}>{annonces.title}</Text>
              </View>
              <View style={styles.infos_container}>
                {/* <Text style={styles.description_text} >{annonces.description}</Text> */}
                <Text style={styles.price_text} >{annonces.price}€</Text>
            
              </View>
            </View>
          </View>
          </TouchableOpacity>
        )
      }
    }
    
    const styles = StyleSheet.create({
      main_container: {
        height: 190,
        flexDirection: 'row',
        borderColor:'#20554f',
        borderWidth: 0.3,
        backgroundColor: 'rgba(32, 85, 79, 0.15)',
        margin : 3,
        shadowOffset:{  width: 5,  height: 5,  },
        shadowColor: 'black',
        shadowOpacity: 1.0,
      },
      image: {
        width: 180,
        height: 180,
        margin: 5,
        backgroundColor: 'gray'
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
      },
      price_text:{
        fontSize : 25,
        fontStyle: 'italic',
        color: 'white'
      }
    })



export default _Annonces;