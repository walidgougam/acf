import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  AsyncStorage,
} from 'react-native';
import typography from '../../constants/typography/textDesign';
import colors from '../../constants/colors/colors';
import t from '../../lib/translate';
import MainHeader from '../../components/molecules/MainHeader';
import image from '../../../assets/image';
import BtnFooter from '../../components/atoms/btn/BtnFooter';
import {Checkbox} from 'react-native-paper';
import {ScrollView} from 'react-native-gesture-handler';
import {n} from '../../Helpers'; //normalize
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {f, auth, database} from '../../../ConfigFirebase';
import NetInfo from '@react-native-community/netinfo';
import {editFamily} from '../../lib/sync';

export default class EditDataAcceptation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      agreeState1: false,
      disagreeState1: false,
      agreeState2: false,
      disagreeState2: false,
      idOfCurrentMember: '',
      idOfCurrentFoodActivity: '',
      idAcfOwner: '',
      idOfCurrentFamily: '',
    };
  }
  static navigationOptions = {
    header: null,
  };

  componentDidMount = async () => {
    let idOfCurrentMember = await AsyncStorage.getItem('idOfCurrentMember');
    let idOfCurrentFamily = await AsyncStorage.getItem('idOfCurrentFamily');
    let id = await AsyncStorage.getItem('idOfAcfOwner');
    let idOfCurrentFoodActivity = await AsyncStorage.getItem(
      'idOfCurrentFoodActivity',
    );
    this.setState({
      idOfCurrentMember,
      idOfCurrentFoodActivity,
      idAcfOwner: id,
      idOfCurrentFamily,
    });
  };

  checkedTopBtn = type => {
    let {agreeState1, disagreeState1} = this.state;
    if (agreeState1 === false && type === 1) {
      this.setState({
        agreeState1: true,
        disagreeState1: false,
      });
    } else if (agreeState1 === true && type === 1) {
      this.setState({
        agreeState1: false,
      });
    } else if (disagreeState1 === false && type === 2) {
      this.setState({
        disagreeState1: true,
        agreeState1: false,
      });
    } else if (disagreeState1 === true && type === 2) {
      this.setState({
        disagreeState1: false,
      });
    }
  };

  checkedBottomBtn = type => {
    let {agreeState2, disagreeState2} = this.state;
    if (agreeState2 === false && type === 1) {
      this.setState({
        agreeState2: true,
        disagreeState2: false,
      });
    } else if (agreeState2 === true && type === 1) {
      this.setState({
        agreeState2: false,
      });
    } else if (disagreeState2 === false && type === 2) {
      this.setState({
        disagreeState2: true,
        agreeState2: false,
      });
    } else if (disagreeState2 === true && type === 2) {
      this.setState({
        disagreeState2: false,
      });
    }
  };

  backgroundColorBtnNext() {
    return (this.state.agreeState1 || this.state.disagreeState1) &&
      (this.state.agreeState2 || this.state.disagreeState2)
      ? colors.green_btn_icon
      : colors.grey_title_20;
  }

  colorBtnNext() {
    return (this.state.agreeState1 || this.state.disagreeState1) &&
      (this.state.agreeState2 || this.state.disagreeState2)
      ? colors.white
      : colors.grey_title;
  }

  btnNext = () => {
    const {
      agreeState1,
      disagreeState1,
      agreeState2,
      disagreeState2,
      idOfCurrentMember,
      idOfCurrentFoodActivity,
    } = this.state;
    const {navigate} = this.props.navigation;
    const {
      familyID,
      membersFamily,
      familyData,
      food_activity,
      qrCodeID,
      membersID,
    } = this.props.navigation.state.params;
    let memebersID = [];
    NetInfo.fetch().then(async state => {
      if (state.isConnected) {
        editFamily(
          familyID,
          familyData,
          membersFamily,
          food_activity,
          qrCodeID,
          membersID, //for now undefined
        );
      } else {
        await AsyncStorage.setItem('familyData', JSON.stringify(familyData));
        await AsyncStorage.setItem(
          'membersFamily',
          JSON.stringify(membersFamily),
        );
        await AsyncStorage.setItem(
          'food_activity',
          JSON.stringify(food_activity),
        );
      }
      navigate('EditFamilyCard', {
        familyData,
        membersFamily,
        qrCodeID,
      });
    });
  };

  render() {
    const {
      agreeState1,
      agreeState2,
      disagreeState1,
      disagreeState2,
    } = this.state;
    const {
      membersFamily,
      familyData,
      food_activity,
    } = this.props.navigation.state.params;
    return (
      <View style={styles.container}>
        {/* name of family must be a props which will be different depending on family*/}
        <MainHeader
          title={t('acceptation')}
          topic={membersFamily[0].name ? membersFamily[0].name + ' family' : ''}
          press={() => this.props.navigation.goBack()}
        />
        <View style={styles.wrapper_white_background}>
          <ScrollView>
            <View style={styles.circle_img}>
              <Image source={image.family_green} style={styles.img} />
            </View>
            <View style={styles.wrapper_data}>
              <View style={styles.wrapper_data_inside}>
                <Text style={styles.text_data}>
                  {t('dataAcceptationTextTop')}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      this.checkedTopBtn(1);
                    }}>
                    <View
                      style={{
                        backgroundColor: colors.blue_mainColorApp,
                        height: hp('6.1%'),
                        width: wp('30.4%'),
                        borderRadius: n(4),
                        flexDirection: 'row',
                        alignItems: 'center',
                        padding: 0,
                      }}>
                      <Checkbox
                        status={agreeState1 ? 'checked' : 'unchecked'}
                        theme={{
                          colors: {
                            accent: colors.white, // mettre l'opacité a 40%
                          },
                        }}
                      />
                      <Text style={styles.text_btn_agree}> {t('agree')} </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      this.checkedTopBtn(2);
                    }}>
                    <View
                      style={{
                        backgroundColor: colors.white,
                        marginLeft: n(16),
                        height: hp('6.1%'),
                        width: n(140),
                        borderRadius: n(4),
                        flexDirection: 'row',
                        alignItems: 'center',
                        padding: 0,
                      }}>
                      <Checkbox
                        status={disagreeState1 ? 'checked' : 'unchecked'}
                        theme={{
                          colors: {
                            accent: colors.blue_mainColorApp_40,
                          },
                        }}
                      />
                      <Text style={styles.text_btn_disagree}>
                        {t('disagree')}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={styles.wrapper_data}>
              <View style={styles.wrapper_data_inside}>
                <Text style={styles.text_data}>
                  {t('dataAcceptationTextBottom')}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      this.checkedBottomBtn(1);
                    }}>
                    <View
                      style={{
                        backgroundColor: colors.blue_mainColorApp,
                        height: hp('6.1%'),
                        width: wp('30.4%'),
                        borderRadius: n(4),
                        flexDirection: 'row',
                        alignItems: 'center',
                        padding: 0,
                      }}>
                      <Checkbox
                        status={agreeState2 ? 'checked' : 'unchecked'}
                        theme={{
                          colors: {
                            accent: colors.white, // mettre l'opacité a 40%
                          },
                        }}
                      />
                      <Text style={styles.text_btn_agree}> {t('agree')} </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      this.checkedBottomBtn(2);
                    }}>
                    <View
                      style={{
                        backgroundColor: colors.white,
                        marginHorizontal: n(16),
                        height: hp('6.1%'),
                        width: n(140),
                        borderRadius: n(4),
                        flexDirection: 'row',
                        alignItems: 'center',
                        padding: 0,
                      }}>
                      <Checkbox
                        status={disagreeState2 ? 'checked' : 'unchecked'}
                        theme={{
                          colors: {
                            accent: colors.blue_mainColorApp, // mettre l'opacité a 40%
                          },
                        }}
                      />
                      <Text style={styles.text_btn_disagree}>
                        {t('disagree')}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
        <BtnFooter
          title={t('next').toUpperCase()}
          backgroundColor={this.backgroundColorBtnNext()}
          color={this.colorBtnNext()}
          press={() => this.btnNext()}
        />
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
  },
  circle_img: {
    borderWidth: 1,
    borderRadius: 107,
    borderColor: colors.grey_title_20,
    width: n(108),
    height: n(108),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: n(30),
    marginBottom: n(31),
    alignSelf: 'center',
  },
  img: {
    width: n(63),
    height: n(65),
  },
  wrapper_data: {
    backgroundColor: colors.beige_data,
    borderRadius: n(10),
    marginHorizontal: n(17),
    marginBottom: n(15),
  },
  wrapper_data_inside: {
    marginHorizontal: n(19),
    marginVertical: n(21),
  },
  text_data: {
    marginBottom: n(15),
  },
  wrapper_buttons: {
    flexDirection: 'row',
  },
  wrapper_btn_checkbox: {
    flexDirection: 'row',
    borderRadius: n(4),
    height: hp('6.1%'),
  },
  text_btn_agree: {
    color: colors.white,
  },
  text_btn_disagree: {
    color: colors.blue_mainColorApp,
  },
});
