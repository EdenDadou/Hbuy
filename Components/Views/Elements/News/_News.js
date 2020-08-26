import React, { Component } from 'react';
import { Text, View, Item, Button, } from 'native-base';
import { StyleSheet, Image, ActivityIndicator, TouchableOpacity, Dimensions, ImageBackground } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
const { width, height } = Dimensions.get('window')



export function getNewsImage(title) {
  return 'http://www.h-buy.fr/n_pic/' + title
}


class _News extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

      newstitle: '',
      article: '',
    }
  }

  componentWillMount = () => {
    const news = this.props.news
    this.setState({
      newstitle: news.newstitle,
      article: news.article,

    })
  }



  onPress = () => {
    const { newstitle, article } = this.state
    this.props.navigation.navigate('NewsView', { newstitle, article })
  }



  render() {
    const news = this.props.news
    return (
      <TouchableOpacity onPress={this.onPress}>
        <View style={styles.newsView}>
          <ImageBackground
            source={{ uri: getNewsImage(news.newstitle) }}
            style={styles.image}>
            <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.8)']} 
            style={{ height: height / 3+20, width: width*0.95 }}>
            <View style={styles.title_container}>
              <Text style={styles.title}>{news.newstitle}</Text>
            </View>
          </LinearGradient>
          </ImageBackground>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  newsView: {
    height: height/3 + 40,
    borderColor: '#20554f',
    borderWidth: 0.3,
    backgroundColor: 'rgba(32, 85, 79, 0.15)',
    shadowOffset: { width: 5, height: 5, },
    shadowColor: 'black',
    shadowOpacity: 1.0,
    marginBottom: 10 
  },
  image: {
    width: width * 0.95,
    height: height / 3+20,
    marginVertical: 10,
    marginHorizontal: width * 0.025,
    backgroundColor: 'gray',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title_container: {
    height: height / 8,
    // width: width*0.9,
    marginTop:height/3-80,
    marginHorizontal: width*0.05,
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
    marginHorizontal: width*0.05,
    marginVertical: height*0.025,
    textAlign: 'justify',
    fontSize: 18
  },
  date_container: {
    flex: 1
  },
  date_text: {
    textAlign: 'right',
    fontSize: 14
  }
})



export default _News;