import React, {Component} from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import image from '../../../assets/image';
import colors from '../../constants/colors/colors';
import sizing from '../../constants/typography/sizing';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {n} from '../../Helpers'; //normalize

export default class MainHeader extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {search, title, topic, press, familyCard} = this.props;
    return (
      <View style={styles.container}>
        <View style={[styles.wrapperHeader, search && {alignItems: 'center'}]}>
          {!familyCard && (
            <TouchableOpacity onPress={press}>
              <Image source={image.arrow_goback} style={styles.img_goback} />
            </TouchableOpacity>
          )}
          {search ? (
            <View style={[styles.wrapper_text]}>
              <Text style={styles.text_title}>{title}</Text>
            </View>
          ) : (
            <View style={[styles.wrapper_text]}>
              <Text style={styles.text_title}>{title}</Text>
              <Text style={styles.text_topic}>{topic}</Text>
            </View>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.blue_mainColorApp,
    flex: 1,
  },
  wrapperHeader: {
    flexDirection: 'row',
    marginHorizontal: n(16),
    marginTop: 10,
  },
  img_goback: {
    width: 39,
    height: 39,
    marginTop: n(24),
  },
  wrapper_text: {marginLeft: n(8), marginTop: n(19)},
  text_title: {
    color: colors.white,
    fontSize: n(22),
  },
  text_topic: {
    color: colors.white,
    fontSize: n(14),
    lineHeight: n(16),
  },
});
