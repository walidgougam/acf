import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Checkbox} from 'react-native-paper';
import colors from '../../../constants/colors/colors';
import fonts from '../../../constants/typography/fonts';
import image from '../../../../assets/image';
import {n} from '../../../Helpers'; //normalize
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default class CardSearch extends Component {
  render() {
    const {
      firstName,
      name,
      gender,
      age,
      householder,
      town,
      picture,
      dataMember,
      familyID,
    } = this.props;
    return (
      <TouchableOpacity
        style={styles.card_search}
        onPress={() =>
          this.props.navigation.navigate('DeliverAndHistorySearch', {
            firstName,
            name,
            age,
            dataMember,
            familyID,
          })
        }>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.img_family_circle}>
            <Image source={image.family_green} style={styles.img_family} />
          </View>
          <View style={{marginLeft: 10}}>
            <Text style={styles.text_name}>
              {firstName + ' '} {name}
            </Text>
            <View style={styles.members_details}>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.text_members_details}>{gender}</Text>
                <Text style={styles.text_members_details}>
                  {age && age + ' years' + ' - '}
                </Text>
                {householder && (
                  <Text style={styles.text_members_details}>
                    {'Householder'}
                  </Text>
                )}
              </View>
              <View>
                <Text style={styles.text_members_details}>{town}</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={{marginLeft: 15}}>
          <Image source={picture} style={{width: 9, height: 14}} />
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  card_search: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: n(16),
    alignItems: 'center',
    borderBottomColor: colors.grey_food_activity,
    borderBottomWidth: 1,
    height: hp('16.2%'),
  },
  img_family_circle: {
    backgroundColor: colors.white,
    width: 78,
    height: 78,
    borderRadius: n(107),
    borderBottomColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  img_family: {
    width: 66,
    height: 70,
  },
  text_name: {
    color: colors.blue_mainColorApp,
    fontSize: n(16),
    lineHeight: n(20),
    fontFamily: fonts.robotoMedium,
  },
  text_members_details: {
    color: colors.grey_title,
    fontSize: n(14),
    lineHeight: n(16),
    fontFamily: fonts.robotoMedium,
  },
  members_details: {},
});
