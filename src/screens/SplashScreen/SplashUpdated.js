import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import colors from '../../constants/colors/colors';
import image from '../../../assets/image';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {n} from '../../Helpers'; //normalize

export default class SplashUpdating extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.central_wrapper}>
          <Image source={image.valid} style={styles.image} />
          <View style={styles.text_bloc}>
            <Text style={styles.text_sync}>{t('synchronized')}</Text>
            <Text style={styles.text_dataSync}>{t('data_synchronized')}</Text>
          </View>
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
  central_wrapper: {
    width: wp('74.6%'),
    height: hp('45.8%'),
    borderRadius: n(16),
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text_bloc: {
    flex: 1,
  },
  text_sync: {
    textAlign: 'center',
    color: colors.blue_mainColorApp,
    fontSize: n(20),
    lineHeight: n(24),
  },
  text_dataSync: {
    color: colors.black,
    fontSize: n(15),
    lineHeight: n(18),
  },
  image: {
    flex: 3,
    width: wp('30.6%'),
    height: hp('13.5%'),
    position: 'relative',
    top: n(20),
    resizeMode: 'contain',
    flexDirection: 'column',
    alignContent: 'flex-end',
  },
});
