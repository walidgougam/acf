import React, {Component} from 'react';
import {View, StyleSheet, Text, ScrollView} from 'react-native';
import sizing from '../../constants/typography/sizing';
import {RadioButton} from 'react-native-paper';
import colors from '../../constants/colors/colors';
import InputField from '../../components/atoms/forms/InputField';
import t from '../../lib/translate';
import BtnFooter from '../../components/atoms/btn/BtnFooter';
import MainHeader from '../../components/molecules/MainHeader';
import typography from '../../constants/typography/textDesign';
import fonts from '../../constants/typography/fonts';
import localisationTab from '../../Helpers';
import {Dropdown} from 'react-native-material-dropdown';

import {n} from '../../Helpers'; //normalize
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default class AdvancedSearch extends Component {
  constructor() {
    super();
    this.state = {
      man: false,
      woman: false,
      notDisclosed: false,
      name: '',
      first_name: '',
      age: '',
      identity_number: '',
      province: '',
      territory: '',
      healthzone: '',
      healtharea: '',
      village: '',
    };
  }
  static navigationOptions = {
    header: null,
  };

  handleForm = (type, value) => {
    this.setState({
      [type]: value,
    });
  };

  handleGender = type => {
    if (type === 'man') {
      this.setState({
        man: true,
        woman: false,
      });
    } else if (type === 'woman') {
      this.setState({
        man: false,
        woman: true,
      });
    } else {
      this.setState({
        man: false,
        woman: false,
      });
    }
  };

  btnSearch = () => {
    this.props.navigation.navigate('SearchResult', {
      first_name: this.state.first_name,
      name: this.state.name,
      age: this.state.age,
    });
  };
  render() {
    const {
      name,
      man,
      woman,
      notDisclosed,
      first_name,
      age,
      identity_number,
      province,
      territory,
      healthzone,
      healtharea,
      village,
    } = this.state;
    return (
      <View style={styles.container}>
        <MainHeader
          search
          title={t('advancedSearch')}
          press={() => {
            this.props.navigation.navigate('Home');
          }}
        />
        <View style={styles.wrapper_white_background}>
          <ScrollView>
            <Text style={styles.text_about}>{t('aboutPerson')}</Text>
            <View style={styles.wrapper_btn_gender}>
              <RadioButton.Group
              // onValueChange={value => this.setState({value})}
              // value={this.state.value}
              >
                <View style={{flexDirection: 'row'}}>
                  <View style={styles.btn_gender}>
                    <RadioButton
                      value="man"
                      color={colors.blue_mainColorApp}
                      status={man ? 'checked' : 'unchecked'}
                      onPress={() => {
                        this.handleGender('man');
                      }}
                    />
                    <Text style={styles.text_gender}>{t('man')}</Text>
                  </View>
                  <View style={styles.btn_gender}>
                    <RadioButton
                      value="woman"
                      color={colors.blue_mainColorApp}
                      status={woman ? 'checked' : 'unchecked'}
                      onPress={() => {
                        this.handleGender('woman');
                      }}
                    />
                    <Text style={styles.text_gender}>{t('woman')}</Text>
                  </View>
                </View>
                <View style={styles.btn_gender}>
                  <RadioButton
                    color={colors.blue_mainColorApp}
                    value="notDisclosed"
                    status={notDisclosed ? 'checked' : 'unchecked'}
                    onPress={() => {
                      this.handleGender('not');
                    }}
                  />
                  <Text style={styles.text_gender}>{t('not_disclosed')}</Text>
                </View>
              </RadioButton.Group>
            </View>
            <View style={styles.wrapper_input}>
              <InputField
                title={t('name')}
                marginBottom={n(20)}
                type="name"
                onChange={(type, value) => this.handleForm(type, value)}
                value={name}
              />
              <InputField
                title={t('first_name')}
                marginBottom={n(20)}
                type="first_name"
                onChange={(type, value) => this.handleForm(type, value)}
                value={first_name}
              />
              <InputField
                title={t('age')}
                marginBottom={n(20)}
                type="age"
                onChange={(type, value) => this.handleForm(type, value)}
                value={age}
              />
              <InputField
                title={t('identity_number')}
                marginBottom={n(20)}
                type="identity_number"
                onChange={(type, value) => this.handleForm(type, value)}
                value={identity_number}
              />
            </View>
            <Text style={styles.text_about}>{t('aboutLocation')}</Text>
            <View style={styles.wrapper_input}>
              <Dropdown
                label="Province"
                data={localisationTab.province}
                containerStyle={styles.dropdownStyle}
                onChangeText={value => this.handleForm('province', value)}
                value={province}
              />
              <Dropdown
                label="Territory"
                data={localisationTab.territory}
                containerStyle={styles.dropdownStyle}
                onChangeText={value => this.handleForm('territory', value)}
                value={territory}
              />
              <Dropdown
                label="Healthzone"
                data={localisationTab.healthzone}
                containerStyle={styles.dropdownStyle}
                onChangeText={value => this.handleForm('healthzone', value)}
                value={healthzone}
              />
              <Dropdown
                label="Healtharea"
                data={localisationTab.healtharea}
                containerStyle={styles.dropdownStyle}
                onChangeText={value => this.handleForm('healtharea', value)}
                value={healtharea}
              />
              {/*remplacer village par town*/}
              <Dropdown
                label="Village"
                data={localisationTab.village}
                containerStyle={{marginBottom: 40}}
                onChangeText={value => this.handleForm('village', value)}
                value={village}
              />
            </View>
          </ScrollView>
        </View>
        <BtnFooter
          title="SEARCH"
          press={() => this.btnSearch()}
          backgroundColor={colors.green_btn_icon}
          color={colors.white}
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
  text_about: {
    width: wp('100%'),
    marginHorizontal: n(16),
    marginVertical: n(20),
    fontSize: n(14),
    color: colors.grey_title,
    fontFamily: fonts.robotoRegular,
    lineHeight: n(16),
  },
  wrapper_btn_gender: {
    flexDirection: 'column',
    marginLeft: n(sizing.M),
    marginBottom: n(25),
  },
  btn_gender: {
    flexDirection: 'row',
    width: wp('50%'),
    alignItems: 'center',
  },
  text_gender: {
    marginLeft: 6,
  },
  wrapper_input: {
    borderBottomColor: colors.grey_title_20,
    marginHorizontal: n(sizing.M),
    borderBottomWidth: 1,
    paddingBottom: n(11),
  },
});
