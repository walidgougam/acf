import React, {Component} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import colors from '../../constants/colors/colors';
import image from '../../../assets/image';
import {n} from '../../Helpers'; // normalize
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default class LoginHeader extends Component {
  render() {
    return (
      <View style={styles.wrapper_signIn}>
        <Image source={image.logo} style={styles.logo} />
        <Text style={styles.text_signin}>{this.props.title}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper_signIn: {
    width: wp('100%'),
    alignItems: 'center',
    marginTop: n(36),
    alignContent: 'center',
    marginBottom: n(50),
  },
  logo: {
    height: hp('12.9%'),
    width: wp('12.5%'),
    resizeMode: 'contain',
  },
  text_signin: {
    fontSize: n(30),
    color: colors.white,
    lineHeight: n(40),
    // fontFamily:fonts.Futura-Bold
  },
});
