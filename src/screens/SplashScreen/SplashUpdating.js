import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import colors from '../../constants/colors/colors';
import image from '../../../assets/image';
import {n} from '../../Helpers'; //normalize
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default class SplashUpdating extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.central_white_wrapper}>
          <Image source={image.logo_phone} style={styles.image} />
          <Text style={styles.text_syncProgress}>{t('sync_progress')}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.blue_mainColorApp,
    justifyContent: 'center',
    alignItems: 'center',
  },
  central_white_wrapper: {
    width: wp('74.6%'),
    height: hp('45.8%'),
    paddingTop: n(31),
    paddingBottom: n(31),
    borderRadius: n(16),
    backgroundColor: colors.white,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'column',
  },
  image: {
    width: wp('51.5%'),
    height: hp('17.4%'),
  },
  text_syncProgress: {
    color: colors.blue_mainColorApp,
    fontSize: n(20),
  },
});
