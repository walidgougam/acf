import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  PermissionsAndroid,
  Platform,
  AsyncStorage,
} from 'react-native';
import MainHeader from '../../components/molecules/MainHeader';
import typography from '../../constants/typography/textDesign';
import t from '../../lib/translate';
import fonts from '../../constants/typography/fonts';
import colors from '../../constants/colors/colors';
import {ScrollView} from 'react-native-gesture-handler';
import image from '../../../assets/image';
import BtnMain from '../../components/atoms/btn/BtnMain';
import QRCode from 'react-native-qrcode-image';
global.Buffer = global.Buffer || require('buffer').Buffer;
import {n} from '../../Helpers'; //normalize
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {database} from '../../../ConfigFirebase';
import ViewShot from 'react-native-view-shot';
import Mailer from 'react-native-mail';
import RNFS from 'react-native-fs';
var moment = require('moment');

export default class FamilyCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageUri:
        '/data/user/0/com.actioncontrefaim/files/project_overview_1580835538617.png',
      idOfCurrentMember: '',
      idOfCurrentFamily: '',
      familyName: '',
      familyMembers: '',
      dateOfCreation: '',
      familyId: '',
      nameOfHouseholder: '',
      qrcodeID: '',
      isLoading: true,
    };
  }
  static navigationOptions = {
    header: null,
  };
  
  componentDidMount = async () => {
    let idOfCurrentMember = await AsyncStorage.getItem('idOfCurrentMember');
    let idOfCurrentFamily = await AsyncStorage.getItem('idOfCurrentFamily');
    this.setState({
      idOfCurrentMember,
      idOfCurrentFamily,
    });
    this.getDataMember();
  };

  getDataMember() {
    const {familyName, dateOfCreation, familyMembers} = this.state;
    const {familyData, membersFamily} = {
      ...this.props.navigation.state.params,
    };
    let _nameHouseholder = '';
    const _familyMembers = membersFamily[0].family_members;
    for (let i = 0; i < membersFamily.length; i++) {
      if (membersFamily[i].isHouseholder) {
        _nameHouseholder = membersFamily[i].first_name;
      }
    }
    this.setState({
      familyName: membersFamily[0].name,
      nameOfHouseholder: _nameHouseholder,
      familyMembers: _familyMembers,
    });
  }

  urlSnapshot = null;

  btnFinish = () => {
    this.props.navigation && this.props.navigation.navigate('Home');
  };

  onCapture = uri => {
    this.path = uri;
    this.setState({
      imageUri: uri,
    });
  };

  sendMail = async () => {
    this.refs.viewShot.capture().then(async uri => {
    
    if (Platform.OS !== 'ios') {
      try {
        let hasPermission = await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        );
        if (!hasPermission) {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
              title: 'write_storage_permission',
              message: 'write_storage_permission_message',
              buttonNegative: 'cancel',
              buttonPositive: 'ok',
            },
          );
          hasPermission = granted !== PermissionsAndroid.RESULTS.GRANTED;
        }
        if (!hasPermission) {
          handleError('error_accessing_storage');
          return;
        }
      } catch (error) {
        console.warn(error);
      }

      this.path2 = `${
        RNFS.ExternalStorageDirectoryPath
      }/project_overview_${Number(new Date())}.png`;

      try {
        await RNFS.copyFile(uri, this.path2);
      } catch (error) {
        alert(error);
        return;
      }
    }

    Mailer.mail(
      {
        subject: 'Send QR CODE',
        recipients: ['support@example.com'],
        ccRecipients: [],
        bccRecipients: [],
        body: ' ',
        isHTML: true,
        attachment: {
          path: this.path2, // The absolute path of the file from which to read data.
          type: 'png', // Mime Type: jpg, png, doc, ppt, html, pdf, csv
          name: 'QRCODE', // Optional: Custom filename for attachment
        },
      },
      (error, event) => {
        Alert.alert(
          error,
          event,
          [
            {
              text: 'Ok',
              onPress: () => console.log('OK: Email Error Response'),
            },
            {
              text: 'Cancel',
              onPress: () => console.log('CANCEL: Email Error Response'),
            },
          ],
          {
            cancelable: true,
          },
        );
      },
    );
  })
  };

  render() {
    const {familyData} = {
      ...this.props.navigation.state.params,
    };
    return (
      // this.state.isLoading ? (
      //   <View style={{flex: 1, justifyContent: 'center'}}>
      //     <ActivityIndicator size="large" color="#0000ff" />
      //   </View>
      // ) : (
      <View style={styles.container}>
        <MainHeader
          familyCard
          title={t('cardCreation')}
          topic={this.state.familyName ? this.state.familyName + ' family' : ''}
          press={() => this.props.navigation && this.props.navigation.goBack()}
        />
        <View style={styles.wrapper_white_background}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.wrapper_card_and_print}>
              <ViewShot ref="viewShot">
                <View style={[styles.wrapper_card]}>
                  <View
                    style={[
                      styles.wrapper_top_blue,
                      Platform === 'ios'
                        ? {
                            shadowOffset: {
                              width: n(2),
                              height: n(2),
                            },
                            shadowColor: colors.black,
                            shadowOpacity: 0.2,
                          }
                        : {
                            elevation: 5,
                          },
                    ]}>
                    <View
                      style={{
                        flexDirection: 'row',
                      }}>
                      <View style={styles.img_family_circle}>
                        <Image
                          source={image.family_green}
                          style={styles.img_family}
                        />
                      </View>
                      <View style={styles.wrapper_family_info}>
                        <Text style={styles.text_family_name}>
                          {this.state.familyName}
                        </Text>
                        <Text style={styles.text_membres_date}>
                          {this.state.familyMembers
                            ? this.state.familyMembers + ' members'
                            : ''}
                        </Text>
                        {/* <Text style={styles.text_membres_date}></Text>
                        <Text style={styles.text_membres_date}>
                          {moment(this.state.dateOfCreation).format('l')}
                        </Text> */}
                      </View>
                    </View>
                    <View
                      style={{
                        marginLeft: n(25),
                      }}>
                      <View style={{flexDirection: 'row', marginTop: 15}}>
                        <Text style={[styles.text_family_id]}>family id: </Text>
                        <Text
                          numberOfLines={3}
                          style={[
                            styles.text_family_id,
                            {marginLeft: 20, width: 140},
                          ]}>
                          {familyData.uuid}
                        </Text>
                      </View>
                      <Text
                        style={{
                          color: colors.white,
                          fontSize: n(8),
                          lineHeight: n(19),
                          fontFamily: fonts.robotoBold,
                        }}>
                        {this.state.nameOfHouseholder ? 'Householder' : ''}
                      </Text>
                      <Text
                        style={{
                          color: colors.white,
                          fontSize: n(12),
                          lineHeight: n(19),
                          fontFamily: fonts.robotoBold,
                        }}>
                        {this.state.nameOfHouseholder
                          ? this.state.nameOfHouseholder
                          : ' '}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={[
                      styles.wrapper_bottom_white,
                      Platform === 'ios'
                        ? {
                            shadowOffset: {
                              width: n(2),
                              height: n(2),
                            },
                            shadowColor: colors.black,
                            shadowOpacity: 0.2,
                          }
                        : {
                            elevation: 5,
                          },
                    ]}>
                    <Image
                      source={image.action_against_hunger}
                      style={styles.img_against_hunger}
                    />
                    <View style={styles.img_qrcode}>
                      <QRCode
                        value={familyData.uuid}
                        size={n(90)}
                        bgColor="#FFFFFF"
                        fgColor="#000000"
                      />
                    </View>
                  </View>
                </View>
              </ViewShot>
              <TouchableOpacity
                onPress={() => this.sendMail()}
                style={{
                  backgroundColor: colors.blue_mainColorApp,
                  marginTop: n(66),
                  marginBottom: n(35),
                  width: wp('44.2%'),
                  height: hp('6.2%'),
                  justifyContent: 'center',
                  borderRadius: n(4),
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignSelf: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image source={image.print} style={styles.img_print} />
                  <Text style={styles.text_print}> {t('printCard')} </Text>
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
        <View
          style={{
            backgroundColor: colors.white,
            height: hp('10.9%'),
            borderTopWidth: 1,
            borderTopColor: colors.grey_title_20,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <BtnMain
            title="FINISH"
            backgroundColor={colors.green_btn_icon}
            fontSize={14}
            color={colors.white}
            height={hp('6.1%')}
            width={wp('28.8%')}
            press={() => this.btnFinish()}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper_white_background: {
    ...typography.wrapper_white_background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapper_card: {
    width: 260,
    marginTop: n(46),
    marginBottom: n(20),
  },
  wrapper_card_and_print: {
    alignItems: 'center',
  },
  wrapper_top_blue: {
    backgroundColor: colors.blue_mainColorApp,
    width: wp('62.6%'),
    height: 238,
    borderTopLeftRadius: n(14),
    borderTopRightRadius: n(14),
    //
  },
  img_family_circle: {
    backgroundColor: colors.white,
    width: n(88),
    height: n(88),
    borderRadius: n(107),
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: n(24),
    marginTop: n(24),
  },
  img_family: {
    width: n(52),
    height: n(53),
  },
  wrapper_family_info: {
    marginLeft: n(10),
    marginTop: n(27),
    width: wp('25.8%'),
  },
  text_family_name: {
    color: colors.white,
    lineHeight: n(19),
    fontSize: n(18),
    fontFamily: fonts.robotoBold,
  },
  text_family_id: {
    color: colors.white,
    fontSize: n(12),
    lineHeight: n(15),
    fontFamily: fonts.robotoBold,
  },
  text_membres_date: {
    color: colors.white,
    lineHeight: n(10),
    fontSize: n(8),
    fontFamily: fonts.robotoBold,
  },
  wrapper_bottom_white: {
    backgroundColor: colors.white,
    width: wp('62.6%'),
    height: hp('19.6%'),
    borderBottomLeftRadius: n(14),
    borderBottomRightRadius: n(14),
    flexDirection: 'row',
  },
  img_against_hunger: {
    width: n(70),
    height: n(42),
    marginTop: n(72),
    marginLeft: n(20),
  },
  img_qrcode: {
    width: n(93),
    height: n(93),
    marginLeft: n(32),
    marginTop: n(20),
  },
  img_print: {
    width: n(24),
    height: n(24),
  },
  text_print: {
    color: colors.white,
    marginLeft: n(5),
    fontSize: n(12),
    lineHeight: n(20),
  },
});
