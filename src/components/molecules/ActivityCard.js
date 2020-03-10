import React, {Component} from 'react';
import {StyleSheet, View, Image, TouchableOpacity, Text} from 'react-native';
import image from '../../../assets/image';
import color from '../../constants/colors/colors';
import fonts from '../../constants/typography/fonts';
import {n} from '../../Helpers'; //normalize
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
var moment = require('moment');

export default class ActivityCard extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          {this.props.type === 'food' ? (
            <Image source={image.food} style={{width: 20, height: 23}} />
          ) : (
            <Image source={image.drug} style={{width: 20, height: 23}} />
          )}
          <View
            style={{
              marginLeft: n(11),
              width: 270,
            }}>
            <Text
              numberOfLines={2}
              style={{
                color: color.blue_mainColorApp,
                lineHeight: n(20),
                fontSize: n(13),
                fontFamily: fonts.robotoMedium,
              }}>
              {this.props.title}
            </Text>
            <Text
              numberOfLines={2}
              style={{
                color: color.blue_mainColorApp,
                lineHeight: n(20),
                fontSize: n(13),
                fontFamily: fonts.robotoMedium,
              }}>
              {this.props.detail}
            </Text>
            <Text>{moment(this.props.createdAt).format('MMM Do YY')}</Text>
            {/* <Text> Accompagnying: parent 2 </Text> */}
          </View>
        </View>
        {this.props.firstName ? (
          <TouchableOpacity style={[styles.btn, {elevation: 2}]}>
            <Text style={styles.text_view}>{this.props.firstName}</Text>
          </TouchableOpacity>
        ) : (
          <Text></Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: n(17),
    alignItems: 'center',
    height: hp('14.5%'),
    borderBottomColor: color.grey_title_10,
    borderBottomWidth: 1,
  },
  btn: {
    width: wp('12.5%'),
    height: hp('3.6%'),
    backgroundColor: color.white,
    shadowOffset: {
      width: n(2),
      height: n(2),
    },
    shadowColor: color.black,
    shadowOpacity: 0.3,
    borderWidth: 1,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text_view: {
    color: color.blue_mainColorApp,
    lineHeight: n(20),
    fontSize: n(11),
    fontFamily: fonts.robotoMedium,
  },
});
