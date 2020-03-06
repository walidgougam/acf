import colors from '../colors/colors';
import sizing from './sizing';
import fonts from './fonts';
import {
  n
} from '../../Helpers'; //n
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default {
  textSmall: {
    lineHeight: n(20),
    fontSize: n(14),
    fontFamily: fonts.robotoMedium,
  },
  title: {
    fontSize: 18,
    color: colors.black,
    lineHeight: 24,
    fontFamily: fonts.robotoBold,
  },
  headerTitle: {
    fontSize: 11,
    color: colors.blue_mainColorApp,
    lineHeight: 20,
    fontFamily: fonts.robotoMedium,
  },
  bigTitle: {
    fontSize: 30,
    color: colors.white,
    lineHeight: 36,
    fontFamily: fonts.futuraBold,
  },
  textScan: {
    lineHeight: 25,
    color: colors.white,
    fontSize: 22,
    fontFamily: fonts.robotoBold
  },
  btnMainText: {
    lineHeight: n(20),
    fontFamily: fonts.robotoMedium,
  },
  wrapper_white_background: {
    position: 'absolute',
    backgroundColor: colors.white,
    borderColor: colors.grey_title_20, // not sure about the right grey and right opacity
    borderBottomWidth: 1,
    borderTopLeftRadius: n(sizing.XS),
    borderTopRightRadius: n(sizing.XS),
    width: wp('100%'),
    bottom: 71,
    top: n(90),
  },
  input: {
    fontSize: 16,
    backgroundColor: colors.white,
    // height: hp('6.3%'),
    fontFamily: fonts.robotoRegular,
  },
};