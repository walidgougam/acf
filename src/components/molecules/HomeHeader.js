import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  AsyncStorage,
  TouchableOpacity,
} from 'react-native';
import colors from '../../constants/colors/colors';
import image from '../../../assets/image';
import fonts from '../../constants/typography/fonts';
import {n} from '../../Helpers'; //normalize
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {auth} from '../../../ConfigFirebase';

export default class HomeHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      projectTitle: '',
      supervisor: '',
    };
  }
  async componentDidMount() {
    const userAccount = await AsyncStorage.getItem('userLogin');
    let projectTitle = await AsyncStorage.getItem('projectTitle');
    let supervisor = await AsyncStorage.getItem('supervisor');
    this.setState({
      user: userAccount,
      projectTitle: projectTitle,
      supervisor,
    });
  }

  handleExit = async () => {
    auth
      .signOut()
      .then(res => console.log('le user a bien été deconnecté', res))
      .catch(err => console.log(err));
    await AsyncStorage.clear();
    return this.props.navigation.navigate('Auth');
  };

  typeOfMonitor = () => {
    if (this.state.supervisor === 'supervisor') {
      return 'Supervisor';
    } else {
      switch (this.state.projectTitle) {
        case 'Food project name':
          return t('food_monitor');
        case 'Health project name':
          return t('health_monitor');
        default:
          return t('other_monitor');
      }
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.wrapper_text_header}>
          <View style={styles.wrapper_name}>
            <Text style={styles.text_name}>{t('hello').toUpperCase()}</Text>
            <Text style={styles.text_name}>{this.state.user}</Text>
          </View>
          <Text style={styles.text_status}>{this.typeOfMonitor()}</Text>
        </View>
        <TouchableOpacity onPress={() => this.handleExit()}>
          <Image style={styles.img_exit} source={image.exit} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: n(30),
    marginBottom: n(25),
    marginHorizontal: n(16),
  },
  wrapper_text_header: {
    flex: 1,
    justifyContent: 'space-between',
  },
  wrapper_name: {
    //width: 296,
    height: hp('9.7%'),
  },
  text_name: {
    fontSize: n(26),
    color: colors.blue_mainColorApp,
    lineHeight: n(30),
    // fontFamily:fonts.Futura-Bold,
  },
  text_status: {
    color: colors.blue_mainColorApp,
    lineHeight: n(24),
    fontFamily: fonts.robotoRegular,
    fontSize: n(14),
    marginTop: n(6),
  },
  img_exit: {
    width: n(42),
    height: n(42),
  },
});
