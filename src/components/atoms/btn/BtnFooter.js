import React, {Component} from 'react';
import {StyleSheet, View, Image, TouchableHighlight, Text} from 'react-native';
import BtnMain from './BtnMain';
import {n} from '../../../Helpers'; //normalize
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default class BtnFooter extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.btn_footer}>
        <BtnMain
          press={this.props.press}
          size={n(14)}
          title={this.props.title}
          width={wp('28.8%')}
          backgroundColor={this.props.backgroundColor} // not sure about opacity, ask to pierre
          color={this.props.color} //not the good grey i have to change it
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  btn_footer: {
    height: 73,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
