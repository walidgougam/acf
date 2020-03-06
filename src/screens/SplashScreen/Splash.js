import React, {Component} from 'react';
import {StyleSheet, View, Image, AsyncStorage} from 'react-native';
import colors from '../../constants/colors/colors';
import image from '../../../assets/image';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default class Splash extends Component {
  componentDidMount() {
    //setTimeout(this._bootstrapAsync, 500);
    this._bootstrapAsync();
  }

  static navigationOptions = {
    header: null,
  };

  //Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToken');

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(userToken ? 'Home' : 'Auth');
  };

  render() {
    return (
      <View style={styles.container}>
        <Image source={image.logo} style={styles.logo} />
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
  logo: {
    width: wp('28.8%'),
    height: hp('29.9%'),
  },
});
