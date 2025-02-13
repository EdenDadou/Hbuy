import React, { Component } from 'react';
import {
  Animated,
  View,
} from 'react-native';

class FadeImage extends Component {
  static propTypes = {
    source: React.PropTypes.object.isRequired,
    backgroundColor: React.PropTypes.string.isRequired,
    resizeMode: React.PropTypes.string.isRequired,
    style: React.PropTypes.any,
  };

  static defaultProps = {
    backgroundColor: '#ccc',
    resizeMode: 'cover',
    style: {},
  };

  constructor() {
    super();

    this.onLoad = this.onLoad.bind(this);

    this.state = {
      opacity: new Animated.Value(0),
    };
  }

  onLoad() {
    Animated.timing(this.state.opacity, {
      toValue: 1,
      duration: 250,
    }).start();
  }

  render() {
    const style = [this.props.style, { opacity: this.state.opacity }];

    return (
      <View
        style={{ flex: 1 }}
        backgroundColor={this.props.backgroundColor}
      >
        <Animated.Image
          style={style}
          resizeMode={this.props.resizeMode}
          source={this.props.source}
          onLoad={this.onLoad}
        />
      </View>
    );
  }
}

export default FadeImage;