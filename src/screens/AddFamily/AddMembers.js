import React, {Component} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {RadioButton, Switch} from 'react-native-paper';
import colors from '../../constants/colors/colors';
import t from '../../lib/translate';
import fonts from '../../constants/typography/fonts';
import MainHeader from '../../components/molecules/MainHeader';
import BtnMain from '../../components/atoms/btn/BtnMain';
import sizing from '../../constants/typography/sizing';
import typography from '../../constants/typography/textDesign';
import AddPicture from '../../components/atoms/AddPicture';
import InputField from '../../components/atoms/forms/InputField';
import BtnFooter from '../../components/atoms/btn/BtnFooter';
import {f, storage, auth} from '../../../ConfigFirebase';
import {n} from '../../Helpers'; //normalize
import ImagePicker from 'react-native-image-picker';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import NetInfo from '@react-native-community/netinfo';
import ImageResizer from 'react-native-image-resizer';

const initialState = {
  man: false,
  woman: false,
  child: false,
  name: '',
  first_name: '',
  age: '',
  birth_date: '',
  id_number: '',
  marital_status: '',
  family_members: '',
  male_members: '',
  female_members: '',
  sourceProfilePicture: '',
  notDisclosed: false,
  isHouseholder: false,
};

export default class AddMembers extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }
  static navigationOptions = {
    header: null,
  };

  componentDidMount() {
    this.allStateEmpty();
  }

  componentWillUnmount() {
    this.setState(initialState);
    this.allStateEmpty();
  }

  // fonction a reecrire
  allStateEmpty = () => {
    if (
      !this.state.man &&
      !this.state.woman &&
      this.state.name === '' &&
      this.state.first_name === '' &&
      this.state.age === '' &&
      this.state.birth_date === '' &&
      this.state.id_number === '' &&
      this.state.marital_status === '' &&
      this.state.family_members === '' &&
      this.state.male_members === '' &&
      this.state.female_members === '' &&
      this.state.sourceProfilePicture === '' &&
      !this.state.notDisclose &&
      !this.state.isHouseholder
    ) {
      return true;
    } else {
      return false;
    }
  };

  isChild = () => {
    if (this.state.age < 18) {
      this.setState({
        child: true,
      });
    } else {
      this.setState({
        child: false,
      });
    }
  };

  handleForm = (type, value) => {
    this.setState(
      {
        [type]: value,
      },
      () => {
        this.allStateEmpty();
        this.isChild();
      },
    );
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

  uploadPicture = async file => {
    console.log(file.uri, 'file upload picture');
    const size = 200;
    ImageResizer.createResizedImage(file.uri, size, size, 'JPEG', 100)
      .then(async compressedFile => {
        console.log('ici --1');
        try {
          console.log('ici 1');
          const metadata = {
            contentType: file.type,
          };
          const name = +new Date() + '-' + file.fileName;
          const response = await fetch(compressedFile.uri);
          const blob = await response.blob();

          var storageRef = storage.ref('images');
          var uploadTask = storageRef.child(name).put(blob, metadata);
          uploadTask
            .then(snapshot => snapshot.ref.getDownloadURL())
            .then(url => {
              console.log(url, 'urlllll');
              this.setState({
                sourceProfilePicture: url,
              });
            })
            .catch(console.error);
        } catch (e) {
          console.error(e);
        }
      })
      .catch(err => {
        // Oops, something went wrong. Check that the filename is correct and
        // inspect err to get more details.
      });
    return;
  };

  takePicture = () => {
    const options = {
      noData: true,
    };
    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        ImagePicker.launchCamera(options, response => {
          console.log(response, 'response');
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else {
            this.uploadPicture(response);
          }
        });
      } else {
        Alert.alert(
          'Pas de connexion',
          'Veuillez connecter SVP!',
          [
            {
              text: 'Ok',
              onPress: null,
            },
          ],
          {
            cancelable: true,
          },
        );
      }
    });
  };

  showLibrary = () => {
    const options = {
      noData: true,
    };

    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        try {
          ImagePicker.launchImageLibrary(options, response => {
            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else {
              this.uploadPicture(response);
            }
          });
        } catch (e) {
          console.error(e);
        }
      } else {
        Alert.alert(
          'Pas de connexion',
          'Veuillez connecter SVP!',
          [
            {
              text: 'Ok',
              onPress: null,
            },
          ],
          {
            cancelable: true,
          },
        );
      }
    });
  };

  backgroundColorBtnNext() {
    return this.allStateEmpty() ? colors.grey_title_20 : colors.green_btn_icon;
  }

  colorBtnNext() {
    return this.allStateEmpty() ? colors.grey_title : colors.white;
  }

  membersFamily = [];
  btnValidate = async () => {
    let {familyData, oldMembersFamily} = this.props.navigation.state.params;
    const _membersFamily = oldMembersFamily || [];

    _membersFamily.length > 0 && this.membersFamily.concat(_membersFamily);
    await this.membersFamily.push({
      ...this.state,
      id_acf_owner: auth.currentUser?.uid,
      date: f.database.ServerValue.TIMESTAMP,
    });
    !this.allStateEmpty() &&
      this.props.navigation.navigate('FamilyMembers', {
        membersFamily: this.membersFamily,
        familyData,
      });
    this.setState(initialState);
    this.allStateEmpty();
    return;
  };

  saveAddNew = () => {
    this.membersFamily.push({
      ...this.state,
      id_acf_owner: auth.currentUser?.uid,
      date: f.database.ServerValue.TIMESTAMP,
    });
    this.setState(initialState);
    this.allStateEmpty();
  };

  render() {
    const {
      man,
      woman,
      child,
      name,
      first_name,
      age,
      birth_date,
      id_number,
      marital_status,
      family_members,
      male_members,
      female_members,
      isHouseholder,
      sourceProfilePicture,
      notDisclosed,
    } = this.state;

    const {
      singlePerson,
      detailed,
      typeOfProject,
    } = this.props.navigation?.state?.params;
    return (
      <View style={styles.container}>
        <MainHeader
          title={detailed ? t('add1stMember') : t('family_composition')}
          topic={singlePerson ? t('register_single') : t('register_family')}
          press={() => {
            this.props.navigation.goBack();
          }}
        />
        <View style={styles.wrapper_white_background}>
          <ScrollView>
            {!singlePerson && (
              <Text style={styles.text_about_householder}>
                {t('about_householder')}
              </Text>
            )}
            <View style={[styles.wrapper_picture]}>
              <AddPicture
                style={[styles.picture]}
                source={sourceProfilePicture}
              />
              <BtnMain
                press={() => this.takePicture()}
                style={styles.btn_take_photo}
                backgroundColor={colors.blue_mainColorApp}
                color={colors.white}
                width={133}
                size={n(14)}
                title={t('take_photo')} // font size should be 14 but its too big for the button, see with pierre.
              />
              {/*c'est censé etre un bouton en forme de text. que faire?*/}
              <TouchableOpacity onPress={() => this.showLibrary()}>
                <Text style={styles.text_library}> {t('library')} </Text>
              </TouchableOpacity>
            </View>
            {detailed && (
              <View style={styles.switchHouseholder}>
                <Text> Householder </Text>
                <Switch
                  color={colors.blue_mainColorApp}
                  value={isHouseholder}
                  onValueChange={() =>
                    this.setState({
                      isHouseholder: !isHouseholder,
                    })
                  }
                />
              </View>
            )}
            <View style={styles.wrapper_btn_gender}>
              <RadioButton.Group
              // onValueChange={value => this.setState({value})}
              // value={this.state.value}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    width: '100%',
                  }}>
                  <View style={styles.btn_gender}>
                    <RadioButton
                      value="man"
                      color={colors.blue_mainColorApp}
                      status={man ? 'checked' : 'unchecked'}
                      onPress={() => {
                        this.handleGender('man');
                      }}
                    />
                    <Text style={styles.text_gender}> {t('man')} </Text>
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
                    <Text style={styles.text_gender}> {t('woman')} </Text>
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
                  <Text style={styles.text_gender}> {t('not_disclosed')} </Text>
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
                title={t('birth_date')}
                marginBottom={n(20)}
                type="birth_date"
                onChange={(type, value) => this.handleForm(type, value)}
                value={birth_date}
              />
              <InputField
                title={t('identity_number')}
                marginBottom={n(20)}
                type="id_number"
                onChange={(type, value) => this.handleForm(type, value)}
                value={id_number}
              />
              {/* celui ci doit etre un select/dropdown et non un input */}
              <InputField
                title={t('marital_status')}
                marginBottom={n(20)}
                type="marital_status"
                onChange={(type, value) => this.handleForm(type, value)}
                value={marital_status}
              />
            </View>
            {!detailed && (
              <View style={styles.wrapper_family_composition}>
                <Text style={styles.text_family}>
                  {t('family_composition')}
                </Text>
                <View>
                  <InputField
                    title={t('family_member')}
                    marginBottom={n(30)}
                    type="family_members"
                    onChange={(type, value) => this.handleForm(type, value)}
                    value={family_members}
                  />
                  <InputField
                    title={t('men_boys')}
                    marginBottom={n(30)}
                    type="male_members"
                    onChange={(type, value) => this.handleForm(type, value)}
                    value={male_members}
                  />
                  <InputField
                    title={t('women_girls')}
                    marginBottom={n(24)}
                    type="female_members"
                    onChange={(type, value) => this.handleForm(type, value)}
                    value={female_members}
                  />
                </View>
              </View>
            )}
          </ScrollView>
        </View>
        {detailed ? (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: '100%',
              marginHorizontal: n(16),
              height: 71,
            }}>
            <BtnMain
              press={() => this.saveAddNew()}
              size={n(8)}
              title={t('save_another')}
              width={166}
              backgroundColor={colors.white}
              color={colors.blue_mainColorApp}
            />
            <Text
              style={{
                width: wp('2.6%'),
              }}
            />
            <BtnMain
              press={() => this.btnValidate()}
              size={n(12)}
              title={t('finish')}
              width={166}
              backgroundColor={colors.green_btn_icon}
              color={colors.white}
            />
          </View>
        ) : (
          <BtnFooter
            title={t('validate')}
            press={() => this.btnValidate()}
            backgroundColor={this.backgroundColorBtnNext()}
            color={this.colorBtnNext()}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper_inside_scrollview: {
    marginHorizontal: n(17),
  },
  wrapper_white_background: {
    ...typography.wrapper_white_background,
  },
  text_about_householder: {
    ...typography.title,
    marginTop: n(sizing.XL),
    marginLeft: n(sizing.M),
  },
  wrapper_picture: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: n(sizing.XL),
  },
  picture: {
    marginLeft: n(sizing.M),
  },
  btn_take_photo: {
    marginLeft: n(19),
  },
  switchHouseholder: {
    alignItems: 'center',
    marginTop: n(27),
    color: colors.black,
    fontSize: n(16),
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: n(16),
    marginBottom: n(sizing.XL),
    lineHeight: n(19),
    fontFamily: fonts.robotoRegular,
  },
  text_library: {
    marginLeft: n(13),
    color: colors.blue_mainColorApp,
    ...typography.textSmall,
    padding: 10,
  },
  wrapper_btn_gender: {
    marginLeft: n(sizing.M),
    marginBottom: n(25),
  },
  btn_gender: {
    flexDirection: 'row',
    width: wp('50%'),
    alignItems: 'center',
  },
  wrapper_input: {
    marginHorizontal: n(sizing.M),
    borderBottomColor: colors.grey_title_10,
    borderBottomWidth: 1,
    paddingBottom: n(11),
  },
  input: {
    marginBottom: n(20),
  },
  wrapper_family_composition: {
    marginHorizontal: n(sizing.M),
  },
  text_family: {
    ...typography.title,
    marginVertical: n(sizing.XL),
  },
  wrapper_validate: {
    height: hp('10.6%'),
    borderBottomColor: colors.grey_title_20, // pas sur que ca soit 20% d'opacité
    borderBottomWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn_validate: {
    backgroundColor: colors.grey_title, //regler l'opacité, demander a pierre.
    width: wp('44.2%'),
    height: hp('6.1%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  text_validate: {},
});
