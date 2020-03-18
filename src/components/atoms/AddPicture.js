import React, {Component} from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import image from '../../../assets/image';
import colors from '../../constants/colors/colors';
import {n} from '../../Helpers'; //normalize
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default class AddPicture extends Component {
  sourcePicture() {
    const {source} = this.props;
    if (source !== '' && source !== undefined) {
      return {uri: source};
    } else {
      return image.picture;
    }
  }
  render() {
    return (
      <TouchableOpacity
        style={[styles.img_background, this.props.style]}
        onPress={this.props.press}>
        <Image
          source={this.sourcePicture()}
          style={
            this.props.source
              ? [
                  styles.img_background,
                  {
                    transform: [
                      {
                        rotate: '90deg',
                      },
                    ],
                  },
                ]
              : styles.img
          }
        />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  img_background: {
    width: n(78),
    height: n(78),
    backgroundColor: colors.grey_title_80,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 107,
  },
  img: {
    width: n(29),
    height: n(24),
  },
});
