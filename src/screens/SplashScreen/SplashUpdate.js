import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import BtnMain from '../../components/atoms/BtnMain';
import sizing from '../../constants/typography/sizing';
import fonts from '../../constants/typography/fonts';
import colors from '../../constants/colors/colors';
import image from '../../../assets/image';
import {n} from '../../Helpers'; //normalize
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default class SplashUpdate extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.central_white_wrapper}>
          <Image source={image.wifi} style={styles.img_wifi} />
          <Text style={styles.text_connection}>{t('connexion_detexted')}</Text>
          <View style={styles.wrapper_syncData}>
            <Text style={styles.text_syncData}>{t('sync_data')}</Text>
            <Text style={styles.text_syncData}>{t('from_phone')}</Text>
          </View>
          {/* <BtnMain
            backgroundColor={colors.green_btn_icon}
            width={wp('36%')}
            height={hp('6.2%')}
            title="SYNC DATA"
            style={styles.btn_sync}
            size={n(14)}
          /> */}
          <TouchableOpacity>
            <Text style={styles.text_notNow}>{t('not_now').toUpperCase()}</Text>
          </TouchableOpacity>
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
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text_connection: {
    color: colors.blue_mainColorApp,
    fontSize: n(20),
    textAlign: 'center',
    lineHeight: n(24),
    fontFamily: fonts.robotoMedium,
  },
  wrapper_syncData: {
    width: wp('68.8%'),
    height: hp('5.8%'),
  },
  text_syncData: {
    textAlign: 'center',
    lineHeight: n(18),
    fontSize: n(15),
    fontFamily: fonts.robotoRegular,
  },
  text_notNow: {
    color: colors.blue_mainColorApp,
    fontSize: n(14),
    lineHeight: n(20),
    fontFamily: fonts.robotoMedium,
  },
});
