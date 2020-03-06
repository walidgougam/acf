import React, {Component, Fragment} from 'react';
import {StyleSheet, View, Image, TouchableOpacity, Text} from 'react-native';
import {TextInput} from 'react-native-paper';
import colors from '../../../constants/colors/colors';
import sizing from '../../../constants/typography/sizing';
import image from '../../../../assets/image';
import {n} from '../../../Helpers'; //n
import fonts from '../../../constants/typography/fonts';
import TextDesign from '../../../constants/typography/textDesign';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default class InputField extends Component {
  constructor() {
    super();
    this.state = {
      showPassword: false,
    };
  }

  render() {
    const {type, onChange, value, marginBottom} = this.props;
    return (
      <View style={styles.container}>
        <TextInput
          secureTextEntry={
            this.props.type === 'password' && !this.state.showPassword
              ? true
              : false
          }
          label={this.props.title}
          mode="outlined"
          value={value}
          theme={{
            colors: {
              primary: colors.blue_mainColorApp_40, // mettre l'opacité a 40%
            },
          }}
          style={[styles.input, {width: '100%', marginBottom: marginBottom}]}
          onChangeText={value => {
            onChange(type, value);
          }}
        />
        {this.props.type === 'password' && (
          <TouchableOpacity
            hitSlop={{top: 30, bottom: 30, left: 30, right: 30}}
            style={styles.wrapper_img_password}
            onPress={() =>
              this.setState({showPassword: !this.state.showPassword})
            }>
            <Image source={image.password} style={styles.img_password} />
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  form: {
    borderColor: colors.black,
    borderWidth: 1,
    marginBottom: n(100),
  },
  input: {
    ...TextDesign.input,
  },
  wrapper_img_password: {
    position: 'absolute',
    left: '88%',
    top: '43%',
    zIndex: 100,
  },
  img_password: {
    width: n(25),
    height: n(15),
  },
});
