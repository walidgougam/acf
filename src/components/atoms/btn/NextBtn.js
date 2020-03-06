import React, {Component} from 'react';
import {Button} from 'react-native-paper';
import {StyleSheet} from 'react-native';
import {n} from '../../../Helpers'; //normalize
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default class Next extends Component {
  render() {
    const {title, style} = this.props;
    return (
      <Button
        // icon="camera"
        mode="contained"
        onPress={this.props.press}
        style={[styles.btn, style]}>
        {title ? title : t('next')}
      </Button>
    );
  }
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: 'green',
    paddingHorizontal: 10,
    paddingVertical: 10,
    justifyContent: 'center',
  },
});
