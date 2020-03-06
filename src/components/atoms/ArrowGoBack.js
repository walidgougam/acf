import React, {Component} from 'react';
import {StyleSheet, Image, TouchableOpacity} from 'react-native';
import image from '../../../assets/image';
import {n} from '../../Helpers'; //normalize

export default class ArrowGoBack extends Component {
  render() {
    return (
      <TouchableOpacity onPress={() => this.props.press()}>
        <Image source={image.arrow_goback} style={styles.img_goback} />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  img_goback: {
    width: 38,
    height: 38,
    // marginTop: 24,
  },
});
