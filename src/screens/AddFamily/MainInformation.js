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
import {database, auth} from '../../../ConfigFirebase';

export default class MainInformation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      territory: '',
      province: '',
      group: '',
      chieftaincy: '',
      healthzone: '',
      healtharea: '',
      village: '',
      gps: '',
      site: '',
      healthAreaAcf: [],
      // project_title: this.props.navigation.state.params.projectTitle,
    };
  }

  static navigationOptions = {
    header: null,
  };

  componentDidMount() {
    this.allStateEmpty();
    this.getHealthAreaOfAcf();
  }

  getHealthAreaOfAcf = () => {
    database
      .ref('acf_owner')
      .child(auth.currentUser.uid)
      .once('value', snap => {
        let snapshot = snap.val();
        let healthArea = snapshot.health_area;
        let newHealthArea = [];
        for (let i = 0; i < healthArea.length; i++) {
          newHealthArea.push({value: healthArea[i]});
        }
        this.setState({
          healthAreaAcf: newHealthArea,
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
    const {
      singlePerson,
      detailed,
      typeOfProject,
    } = this.props.navigation?.state?.params;

    !this.allStateEmpty() &&
      this.props.navigation.navigate('AddMembers', {
        familyData: {
          ...this.state,
        },
        singlePerson,
        detailed,
        typeOfProject,
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

    const {singlePerson} = this.props.navigation?.state?.params;
    return (
      <View style={styles.container}>
        <MainHeader
          press={() => this.props.navigation.navigate('Home')}
          title="General informations"
          topic={singlePerson ? t('register_single') : t('register_family')}
        />
        <View style={styles.wrapper_white_background}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.wrapper_inside_scrollview}>
              <Text style={styles.text_enter_information}>
                {t('enter_information')}
              </Text>
              <Dropdown
                label={t('province')}
                rippleInsets={{top: 0, bottom: 0, right: 0, left: 0}}
                dropdownOffset={{top: 0, left: 0}}
                data={localisationTab.province}
                containerStyle={styles.dropdownStyle}
                onChangeText={value => this.handleForm('province', value)}
                value={province}
              />
              <Dropdown
                label={t('territory')}
                rippleInsets={{top: 0, bottom: 0, right: 0, left: 0}}
                dropdownOffset={{top: 0, left: 0}}
                data={localisationTab.territory}
                containerStyle={styles.dropdownStyle}
                onChangeText={value => this.handleForm('territory', value)}
                value={territory}
              />
              <Dropdown
                label={t('group')}
                rippleInsets={{top: 0, bottom: 0, right: 0, left: 0}}
                dropdownOffset={{top: 0, left: 0}}
                data={localisationTab.group}
                containerStyle={styles.dropdownStyle}
                onChangeText={value => this.handleForm('group', value)}
                value={group}
              />
              <Dropdown
                label={t('chieftaincy')}
                rippleInsets={{top: 0, bottom: 0, right: 0, left: 0}}
                dropdownOffset={{top: 0, left: 0}}
                data={localisationTab.chieftaincy}
                containerStyle={styles.dropdownStyle}
                onChangeText={value => this.handleForm('chieftaincy', value)}
                value={chieftaincy}
              />
              <Dropdown
                label={t('health_zone')}
                rippleInsets={{top: 0, bottom: 0, right: 0, left: 0}}
                dropdownOffset={{top: 0, left: 0}}
                data={localisationTab.healthzone}
                containerStyle={styles.dropdownStyle}
                onChangeText={value => this.handleForm('healthzone', value)}
                value={healthzone}
              />
              <Dropdown
                label={t('health_area')}
                rippleInsets={{top: 0, bottom: 0, right: 0, left: 0}}
                dropdownOffset={{top: 0, left: 0}}
                data={this.state.healthAreaAcf}
                containerStyle={styles.dropdownStyle}
                onChangeText={value => this.handleForm('healtharea', value)}
                value={healtharea}
              />
              <Dropdown
                label={t('village')}
                rippleInsets={{top: 0, bottom: 0, right: 0, left: 0}}
                dropdownOffset={{top: 0, left: 0}}
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
