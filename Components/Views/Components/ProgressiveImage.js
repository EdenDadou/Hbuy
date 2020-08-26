import React, { Component } from 'react'
import { Image, Animated, View } from 'react-native'

export default class LazyImage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      thumbnailOpacity: new Animated.Value(0),
      key: this.genKey()
    }
  }

  genKey = () => {
	let i = 0
	return `key:${++i}`
  }

  onLoad = () => {
    Animated.timing(this.state.thumbnailOpacity, {
      toValue: 0,
      duration: 250
    }).start();
  }  

  onThumbnailLoad = () => {
    Animated.timing(this.state.thumbnailOpacity, {
      toValue: 1,
      duration: 250
    }).start();
  }

  render() {
    const { key, thumbnailOpacity } = this.state
    const { width, height, source, thumbnail, style } = this.props

    return (
      <View
        width={width}
        height={height}
        backgroundColor={'#CCC'}>
        <Animated.Image 
          resizeMode={'cover'}
          key={key} 
          style={[
            style,
            {
              position: 'absolute',
            }            
          ]}
          source={source}
          onLoad={this.onLoad} />
        <Animated.Image 
          resizeMode={'cover'}
          key={key} 
          style={[
            style,
            {
              opacity: thumbnailOpacity
            }
          ]}
          source={thumbnail}
          onLoad={this.onThumbnailLoad} />
      </View>      
    )
  }
}