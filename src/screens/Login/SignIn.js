import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  AsyncStorage,
  Platform,
  RefreshControl,
  ScrollView,
} from 'react-native';
import InputField from '../../components/atoms/forms/InputField';
import BtnMain from '../../components/atoms/btn/BtnMain';
import LoginHeader from '../../components/molecules/LoginHeader';
import sizing from '../../constants/typography/sizing';
import fonts from '../../constants/typography/fonts';
import t from '../../lib/translate';
import colors from '../../constants/colors/colors';
import typography from '../../constants/typography/textDesign';
import image from '../../../assets/image';
import {auth, database, firebase} from '../../../ConfigFirebase';
import {n} from '../../Helpers'; //normalize
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import NetInfo from '@react-native-community/netinfo';
import {getActivityFoodData, projectData} from '../../lib/sync';
import {Base64} from 'js-base64';

export default class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errorInput: false,
      isConnectedToWifi: Boolean,
      refreshing: false,
      supervisor: '',
    };
    this.isAlreadyConnected();
    this.onChange = this.onChange.bind(this);
    this.validationEmail = this.validationEmail.bind(this);
    this.validationPassword = this.validationPassword.bind(this);
    // this.newUser();
  }

  static navigationOptions = {
    header: null,
  };

  componentDidMount() {
    this.isConnectedToWifi();
    let password = 'test1234';
    // this.verifyEmailAndPassword(this.state.email, this.state.password);
  }

  onChange = (type, value) => {
    if (type === 'email') {
      this.setState({
        email: value,
      });
    } else if (type === 'password') {
      this.setState({
        password: Base64.encode(value),
      });
    }
  };

  isConnectedToWifi = () => {
    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        this.setState({
          isConnectedToWifi: true,
        });
      } else {
        this.setState({
          isConnectedToWifi: false,
        });
      }
    });
  };

  messageNoConnection = () => {
    if (!this.state.isConnectedToWifi) {
      return (
        <View
          style={{
            backgroundColor: 'red',
            width: '100%',
          }}>
          <Text>no wifi connection...</Text>
        </View>
      );
    }
  };

  isAlreadyConnected = async () => {
    const connected = await AsyncStorage.getItem('userLogin');
    return connected && this.props.navigation.navigate('ProjectScreen');
  };

  // newUser = async () => {
  //   await auth.onAuthStateChanged(user => {
  //     if (user) {
  //       console.log(user + 'est connecté');
  //     } else {
  //       console.log('personne nest connecté');
  //     }
  //   });
  // };

  // verifyEmailAndPassword = (email, password) => {
  //   database.ref('/acf_owner').once('value', snap => {
  //     let snapshot = snap.val();
  //     let hello = Object.values(snapshot);
  //     hello.map(e => console.log(e.email, 'e.email'));
  //   });
  // };

  userConnection = () => {
    this.isUserOnDB();
  };

  isUserOnDB = async () => {
    await database.ref('acf_owner').once('value', snap => {
      let snapshot = snap.val();
      let sizeOfSnapshot = Object.keys(snapshot).length;
      let snapshotArray = Object.values(snapshot);
      let allEmail = [];

      for (let i = 0; i < sizeOfSnapshot; i++) {
        if (
          snapshotArray[i].email.toLowerCase() ===
            this.state.email.toLowerCase() &&
          snapshotArray[i].password.toLowerCase() ===
            this.state.password.toLowerCase()
        ) {
          this.setState({
            errorInput: false,
          });
          this.connectDataOfUser(
            snapshotArray[i].supervisor,
            snapshotArray[i].email,
          );
        } else {
          this.setState({
            errorInput: true,
          });
        }
      }
    });
  };

  connectDataOfUser = async (supervisor, email) => {
    try {
      await auth.signInWithEmailAndPassword(
        this.state.email,
        this.state.password,
      );
      await AsyncStorage.setItem('userLogin', email);
      await AsyncStorage.setItem('supervisor', supervisor ? 'supervisor' : '');
      await AsyncStorage.setItem('idOfAcfOwner', auth.currentUser.uid);
      this.props.navigation.navigate('ProjectScreen');
    } catch (err) {
      console.log(err);
    }
  };

  registerUserInDatabase = () => {
    const {id_acf_owner, login, password, supervisor} = this.state;
    database.ref('/acf_owner').set({
      id_acf_owner: id_acf_owner,
      login: login,
      password: password,
      supervisor: supervisor,
    });
  };

  validationEmail = () => {
    const {email, errorInput} = this.state;
    const regexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/;
    if (email === '' && errorInput) {
      return <Text style={styles.validationEmail}>{t('email_empty')}</Text>;
    } else if (!email.match(regexEmail) && errorInput) {
      return <Text style={styles.validationEmail}>{t('email_invalid')}</Text>;
    }
  };

  validationPassword() {
    const {password, errorInput} = this.state;
    if (password === '' && errorInput) {
      return <Text style={styles.validationEmail}>{t('password_empty')}</Text>;
    } else if (password.length < 6 && errorInput) {
      return (
        <Text style={styles.validationEmail}>{t('password_character')}</Text>
      );
    } else if (password.length > 0 && errorInput) {
      return (
        <Text style={styles.validationEmail}>Wrong username or password</Text>
      );
    }
  }

  btnSigninBackground = () => {
    return !this.state.email || !this.state.password
      ? colors.grey_title_20
      : colors.green_btn_icon;
  };

  btnSigninColor = () => {
    return !this.state.email || !this.state.password
      ? colors.grey_title
      : colors.white;
  };

  onRefresh = () => {
    return this.isConnectedToWifi();
  };

  render() {
    const {email, password} = this.state;
    return (
      <View style={styles.container}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={() => this.onRefresh()}
            />
          }>
          <KeyboardAvoidingView
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              width: wp('100%'),
              backgroundColor: colors.blue_mainColorApp,
            }}
            behavior="padding">
            <View>{this.messageNoConnection()}</View>
            <LoginHeader title="SIGN IN" />
            <View style={{width: wp('100%')}}>
              <View
                style={[
                  styles.central_white_wrapper,
                  {
                    height: hp('51.8%'),
                    paddingHorizontal: n(25),
                  },
                  Platform === 'ios'
                    ? {
                        shadowOpacity: 0.26,
                        shadowRadius: 38,
                        shadowColor: colors.black,
                        shadowOffset: {
                          width: 0,
                          height: n(19, 'height'),
                        },
                      }
                    : {elevation: 9},
                ]}>
                <Text style={styles.text_enterDetails}>
                  {t('detail_below')}
                </Text>
                <InputField
                  onChange={this.onChange}
                  title={t('login')}
                  type="email"
                />
                <Text style={styles.wrapper_validation}>
                  {this.validationEmail()}
                </Text>
                {/* changer couleur du placeholder au dessus qui est bleu en gris*/}
                <InputField
                  title="Password"
                  type="password"
                  onChange={this.onChange}
                />
                <Text style={styles.wrapper_validation}>
                  {this.validationPassword()}
                </Text>
                {/* changer couleur du placeholder au dessus qui est bleu en gris*/}

                <BtnMain
                  title="SIGN IN"
                  backgroundColor={this.btnSigninBackground()}
                  color={this.btnSigninColor()}
                  press={() => this.userConnection(email, password)}
                  width={wp('28.8%')}
                  height={hp('6.2%')}
                  size={n(14)}
                />
                <View style={[styles.bloc_scanTeam, {display: 'none'}]}>
                  <Text style={styles.text_scanTeam}> {t('scan_team')} </Text>
                </View>
                <TouchableOpacity
                  style={[{display: 'none'}, styles.btn_loginQrCode]}>
                  <Image source={image.qrcode} style={styles.img_qrcode} />
                  <Text style={styles.text_loginQrCode}>
                    {t('login_qrcode')}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>

          <View style={[{display: 'none'}, styles.wrapper_datasync]}>
            <View>
              <Text style={styles.text_lastdata}> {t('last_data')} </Text>
              <Text style={styles.text_date}> 11 / 12 / 2019 - 11 h30 </Text>
            </View>
            {/* <TouchableHighlight style={styles.btn_datasync}>
            <Text style={styles.text_datasync}> {t('sync_data')} </Text>
          </TouchableHighlight> */}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.blue_mainColorApp,
    alignItems: 'center',
  },
  logo: {
    height: hp('12.8%'),
    width: wp('12.5%'),
    resizeMode: 'contain',
  },
  central_white_wrapper: {
    marginHorizontal: n(16),
    marginBottom: n(60),
    paddingTop: n(31),
    paddingBottom: n(31),
    borderRadius: sizing.M,
    backgroundColor: colors.white,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text_enterDetails: {
    color: colors.grey_title,
    fontSize: n(18),
    lineHeight: n(21),
  },
  bloc_scanTeam: {
    width: wp('100%'),
    alignItems: 'center',
    borderBottomColor: colors.blue_mainColorApp_10, // not sure about the color. i dont know whats hexa code means.
    borderBottomWidth: 1,
    marginBottom: n(25),
  },
  text_scanTeam: {
    position: 'relative',
    top: n(21),
    backgroundColor: colors.white,
    width: wp('44.2%'),
    // height: hp('2.7%'),
    textAlign: 'center',
    lineHeight: n(20),
    fontSize: n(14),
    color: colors.grey_title,
  },
  btn_loginQrCode: {
    backgroundColor: colors.blue_mainColorApp_10,
    width: wp('53.6%'),
    height: hp('6.3%'),
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'space-between',
    justifyContent: 'center',
  },
  img_qrcode: {
    width: wp('6.1%'),
    height: hp('3.4%'),
  },
  text_loginQrCode: {
    fontSize: n(14),
    lineHeight: n(20),
    marginLeft: n(10.3),
    color: colors.blue_mainColorApp,
    fontFamily: fonts.robotoMedium,
  },
  wrapper_datasync: {
    flexDirection: 'row',
    width: wp('100%'),
    justifyContent: 'space-between',
    paddingLeft: n(17),
    paddingRight: n(17),
    position: 'relative',
    bottom: n(31),
  },
  text_lastdata: {
    color: colors.white,
    lineHeight: n(19),
    fontSize: n(16),
    fontFamily: fonts.robotoBold,
  },
  text_date: {
    color: colors.white,
    lineHeight: n(22),
    fontSize: n(16),
    fontFamily: fonts.robotoRegular,
  },
  btn_datasync: {
    backgroundColor: colors.white,
    width: wp('28.8%'),
    height: hp('6.3%'),
    justifyContent: 'center',
  },
  text_datasync: {
    ...typography.textSmall,
    color: colors.blue_mainColorApp,
    textAlign: 'center',
  },
  wrapper_validation: {
    width: wp('100%'),
    marginLeft: '20%',
  },
  validationEmail: {
    color: 'red',
  },
});
