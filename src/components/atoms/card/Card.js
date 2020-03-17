import React, {Component} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import {Checkbox} from 'react-native-paper';
import colors from '../../../constants/colors/colors';
import fonts from '../../../constants/typography/fonts';
import image from '../../../../assets/image';
import {n} from '../../../Helpers'; //normalize

export default class Card extends Component {
  render() {
    const {
      age,
      checked,
      press,
      detail,
      index,
      title,
      householder,
      type,
      next,
    } = this.props;
    return (
      <View style={styles.card_food_activity} key={index}>
        <View>
          <Text style={styles.text_title} numberOfLines={3}>
            {title}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.text_detail}>{detail + ' - '}</Text>
            {age !== '' && age !== undefined && (
              <Text style={styles.text_detail}>{age && age + ' years - '}</Text>
            )}
            {householder && (
              <Text style={styles.text_detail}>{'householder'}</Text>
            )}
          </View>
        </View>
        {type === 'food' && (
          <Checkbox
            status={this.props.checked ? 'checked' : 'unchecked'}
            theme={{
              colors: {
                accent: colors.blue_mainColorApp, // mettre l'opacité a 40%
              },
            }}
            onPress={press}
            onChange={this.props.onChange}
          />
        )}
        {type === 'family' && (
          <Image source={image.food} style={styles.img_family} />
        )}
        {next && <Image source={image.right_arrow} style={styles.img_family} />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card_food_activity: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: colors.grey_food_activity,
    borderBottomWidth: 1,
    paddingBottom: n(22),
    marginTop: n(20),
  },
  text_title: {
    color: colors.blue_mainColorApp,
    fontSize: n(19),
    lineHeight: n(23),
    width: n(320),
    fontFamily: fonts.robotoMedium,
  },
  text_detail: {},
  img_family: {
    width: n(20, 'width'),
    height: n(20, 'height'),
  },
});
