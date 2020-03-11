import React, {Component, Fragment} from 'react';
import {Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import {StyleSheet, Text, CheckBox, Image} from 'react-native';
import sizing from '../../../constants/typography/sizing';
import typography from '../../../constants/typography/textDesign';
import image from '../../../../assets/image';
import {n} from '../../../Helpers'; //n
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default class BtnMain extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {backgroundColor, width, height, size, color} = this.props;
    return (
      <Fragment>
        <Button
          mode="contained"
          onPress={this.props.press}
          style={[
            this.props.style,
            styles.btn,
            {
              backgroundColor: backgroundColor,
              width: n(width),
            },
          ]}>
          <Icon name={this.props.type === 'addMember' && 'plus'} size={n(14)} />
          <Text style={[styles.text_title, {color: color, fontSize: size}]}>
            {this.props.title}
          </Text>
        </Button>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  btn: {
    justifyContent: 'center',
    borderRadius: n(4),
    height: hp('6.1%'),
  },
  text_title: {
    ...typography.BtnMainText,
  },
});
