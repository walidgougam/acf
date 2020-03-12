import React, {Component} from 'react';
import {View, StyleSheet, Text, ScrollView} from 'react-native';
import colors from '../../constants/colors/colors';
import t from '../../lib/translate';
import typography from '../../constants/typography/textDesign';
import fonts from '../../constants/typography/fonts';
import MainHeader from '../../components/molecules/MainHeader';
import InputField from '../../components/atoms/forms/InputField';
import Sizing from '../../constants/typography/sizing';
import BtnFooter from '../../components/atoms/btn/BtnFooter';
import {Dropdown} from 'react-native-material-dropdown';
import localisationTab from '../../Helpers';
import {n} from '../../Helpers'; //normalize
import {database} from '../../../ConfigFirebase';

export default class EditMainInformation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      province: '',
      territory: '',
      group: '',
      chieftaincy: '',
      healthzone: '',
      healtharea: '',
      village: '',
      gps: '',
      site: '',
    };
  }

  static navigationOptions = {
    header: null,
  };

  componentDidMount() {
    this.allStateEmpty();
    this.getDataFamily();
  }

  getDataFamily = () => {
    database
      .ref('family')
      .child(this.props.navigation.state.params.familyID)
      .once('value', snap => {
        let snapshot = snap.val();
        this.setState({
          province: snapshot.province,
          territory: snapshot.territory,
          group: snapshot.group,
          chieftaincy: snapshot.chieftaincy,
          healthzone: snapshot.healthzone,
          healtharea: snapshot.healtharea,
          village: snapshot.village,
          gps: snapshot.gps,
          site: snapshot.site,
        });
      });
  };

  //fonction a reecrire
  allStateEmpty = () => {
    if (
      this.state.province === '' &&
      this.state.territory === '' &&
      this.state.group === '' &&
      this.state.chieftaincy === '' &&
      this.state.healthzone === '' &&
      this.state.healtharea === '' &&
      this.state.village === '' &&
      this.state.gps === '' &&
      this.state.site === ''
    ) {
      return true;
    } else {
      return false;
    }
  };

  handleForm = (type, value) => {
    this.setState(
      {
        [type]: value,
      },
      () => {
        this.allStateEmpty();
      },
    );
  };

  backgroundColorBtnNext() {
    return this.allStateEmpty() ? colors.grey_title_20 : colors.green_btn_icon;
  }

  colorBtnNext() {
    return this.allStateEmpty() ? colors.grey_title : colors.white;
  }

  btnValidate = () => {
    !this.allStateEmpty() &&
      this.props.navigation.navigate('EditMembers', {
        familyData: {
          ...this.state,
        },
        familyID: this.props.navigation.state.params.familyID,
        qrCodeID: this.props.navigation.state.params.qrCodeID,
        membersID: this.props.navigation.state.params.membersID,
      });
  };

  render() {
    const {
      province,
      territory,
      group,
      chieftaincy,
      healthzone,
      healtharea,
      village,
      gps,
      site,
    } = this.state;
    return (
      <View style={styles.container}>
        <MainHeader
          press={() => this.props.navigation.goBack()}
          title="General informations"
          topic={t('register_family')}
        />
        <View style={styles.wrapper_white_background}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.wrapper_inside_scrollview}>
              <Text style={styles.text_enter_information}>
                {t('enter_information')}
              </Text>
              <Dropdown
                // hitSlop={{top: 100, bottom: 100, left: 50, right: 50}}
                label={t('province')}
                data={localisationTab.province}
                containerStyle={styles.dropdownStyle}
                onChangeText={value => this.handleForm('province', value)}
                value={province}
              />
              <Dropdown
                label={t('territory')}
                data={localisationTab.territory}
                containerStyle={styles.dropdownStyle}
                onChangeText={value => this.handleForm('territory', value)}
                value={territory}
              />
              {/* {this.borderDropdown('group', localisationTab.group, group)}
              {this.borderDropdown(
                'chieftaincy',
                localisationTab.chieftaincy,
                chieftaincy,
              )}
              {this.borderDropdown(
                'healthzone',
                localisationTab.healthzone,
                healthzone,
              )}
              {this.borderDropdown(
                'healtharea',
                localisationTab.healtharea,
                healtharea,
              )}
              {this.borderDropdown('village', localisationTab.village, village)} */}

              <Dropdown
                label={t('group')}
                data={localisationTab.group}
                containerStyle={styles.dropdownStyle}
                onChangeText={value => this.handleForm('group', value)}
                value={group}
              />
              <Dropdown
                label={t('chieftaincy')}
                data={localisationTab.chieftaincy}
                containerStyle={styles.dropdownStyle}
                onChangeText={value => this.handleForm('chieftaincy', value)}
                value={chieftaincy}
              />
              <Dropdown
                label={t('health_zone')}
                data={localisationTab.healthzone}
                containerStyle={styles.dropdownStyle}
                onChangeText={value => this.handleForm('healthzone', value)}
                value={healthzone}
              />
              <Dropdown
                label={t('health_area')}
                data={localisationTab.healtharea}
                containerStyle={styles.dropdownStyle}
                onChangeText={value => this.handleForm('healtharea', value)}
                value={healtharea}
              />
              <Dropdown
                label={t('village')}
                data={localisationTab.village}
                containerStyle={{marginBottom: 40}}
                onChangeText={value => this.handleForm('village', value)}
                value={village}
              />
              {/*its not the good design for dropdown, i have to change it*/}
              <InputField
                title={t('gps')}
                type="gps"
                marginBottom={25}
                onChange={(type, value) => this.handleForm(type, value)}
                value={gps}
              />
              <InputField
                title={t('site')}
                type="site"
                marginBottom={25}
                onChange={(type, value) => this.handleForm(type, value)}
                value={site}
              />
            </View>
          </ScrollView>
        </View>
        <BtnFooter
          title={t('validate')}
          navigation={this.props.navigation}
          press={() => this.btnValidate()}
          backgroundColor={this.backgroundColorBtnNext()}
          color={this.colorBtnNext()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  dropdownContainer: {
    borderWidth: 2,
    height: 42,
    marginBottom: Sizing.XL,
    borderColor: colors.blue_mainColorApp_40,
  },
  // dropdownStyle: {
  //   top: -22,
  //   marginHorizontal: Sizing.S,
  //   zIndex: 10,
  // },
  dropdownStyle: {
    marginBottom: 30,
    height: n(42, 'height'),
  },
  container: {
    flex: 1,
  },
  wrapper_inside_scrollview: {
    marginHorizontal: 17,
  },
  wrapper_white_background: {
    ...typography.wrapper_white_background,
    alignItems: 'center',
  },
  text_enter_information: {
    fontSize: n(14),
    lineHeight: 24,
    color: colors.grey_title,
    marginTop: 24,
    marginBottom: 17,
    fontFamily: fonts.robotoRegular,
  },
});
