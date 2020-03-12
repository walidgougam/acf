import React, {Component, Fragment} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  AsyncStorage,
  Platform,
  ActivityIndicator,
} from 'react-native';
import sizing from '../../constants/typography/sizing';
import colors from '../../constants/colors/colors';
import fonts from '../../constants/typography/fonts';
import LoginHeader from '../../components/molecules/LoginHeader';
import image from '../../../assets/image';
import {n} from '../../Helpers'; //normalize
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {ScrollView} from 'react-native-gesture-handler';
import NetInfo from '@react-native-community/netinfo';
import {projectData} from '../../lib/sync';
import t from '../../lib/translate';
import {Base64} from 'js-base64';
import {auth, database} from '../../../ConfigFirebase';

export default class SelectProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      food: 'food',
      allProject: '',
      idAcfOwner: '',
      project: [],
      isLoading: true,
      isConnectedToWifi: Boolean,
    };
  }
  static navigationOptions = {
    header: null,
  };

  componentDidMount = async () => {
    let id = await AsyncStorage.getItem('idOfAcfOwner');
    this.setState({
      idAcfOwner: id,
    });

    this.getData();

    // let data = {
    //   email: 'superviseur25@acf.com',
    //   // health_area: ['Mweso-Territoire', 'Kalonda Ouest'],
    //   health_area: ['Kalomba', 'Drodro'],
    //   password: Base64.encode('superviseur25'),
    //   supervisor: false,
    // };
    // database.ref('acf_owner/' + auth.currentUser.uid).set({...data});
  };

  getData = async () => {
    let _idAcfOwner = await AsyncStorage.getItem('idOfAcfOwner');
    console.log(_idAcfOwner, 'id acf owner');
    NetInfo.fetch().then(async state => {
      if (state.isConnected) {
        projectData(_idAcfOwner, resultProject => {
          this.setState({
            project: resultProject || [],
            isLoading: false,
          });
        });
      } else {
        const resultProject = JSON.parse(
          await AsyncStorage.getItem('projectArea'),
        );

        this.setState({
          project: resultProject || [],
          isLoading: false,
        });
      }
    });
  };

  chooseProject = async project => {
    await AsyncStorage.setItem('projectTitle', project.title);
    this.props.navigation.navigate('Home');
  };

  displayIcon = type => {
    switch (type) {
      case 'food':
        return <Image source={image.food} style={styles.img_topic} />;
      case 'health':
        return <Image source={image.heart} style={styles.img_topic} />;
    }
  };

  render() {
    const {isLoading, project} = this.state;

    return (
      <View style={styles.container}>
        <LoginHeader title={t('project')} />
        <View
          style={[
            styles.central_white_wrapper,
            Platform === 'ios'
              ? {
                  shadowOpacity: 0.26,
                  shadowRadius: 38,
                  shadowColor: colors.black,
                  shadowOffset: {width: 0, height: n(19, 'height')},
                }
              : {elevation: 9},
          ]}>
          <View style={styles.wrapper_text}>
            <Text style={styles.text_selectproject}>{t('select_project')}</Text>
            <Text style={styles.text_selectproject}>
              {t('you_currently_working')}
            </Text>
          </View>
          <ScrollView
            style={styles.wrapper_list}
            showsHorizontalScrollIndicator={false}>
            {this.state.project.map((_project, index) => {
              return (
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={styles.list}
                  key={index}
                  onPress={() => this.chooseProject(_project)}>
                  <>
                    <View
                      style={{
                        flexDirection: 'row',
                        marginLeft: 15,
                        alignItems: 'center',
                      }}>
                      {this.displayIcon(_project.type)}
                      <Text style={styles.text_title} numberOfLines={3}>
                        {_project.title}
                      </Text>
                    </View>
                    <Image
                      source={image.right_arrow}
                      style={styles.img_arrow}
                    />
                  </>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
          <TouchableOpacity
            style={styles.btn_notlisted}
            onPress={() => this.props.navigation.navigate('Home')}>
            {/* <Text style={styles.text_notlisted}>{t('project_not_listed')}</Text> */}
          </TouchableOpacity>
        </View>
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
  central_white_wrapper: {
    width: wp('91.2%'),
    paddingTop: n(25),
    paddingBottom: 0,
    borderRadius: n(sizing.M),
    backgroundColor: colors.white,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  wrapper_text: {
    width: '100%',
    marginBottom: 20,
  },
  text_selectproject: {
    textAlign: 'center',
    justifyContent: 'space-around',
    color: colors.grey_title,
    lineHeight: n(21),
    fontSize: n(18),
    fontFamily: fonts.robotoRegular,
  },
  wrapper_list: {
    // height: hp('27%'),
    //backgroundColor: 'green',
    width: '100%',
    marginVertical: 15,
    //justifyContent: 'center',
    //alignItems: 'center',
  },
  list: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 10,
    // height: hp('9%'),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  img_topic: {
    width: n(20),
    height: n(20),
  },
  text_title: {
    fontSize: n(16),
    color: colors.blue_mainColorApp,
    lineHeight: n(24),
    width: n(240),
    height: n(80),
    flexWrap: 'wrap',
    marginLeft: n(18),
    fontFamily: fonts.robotoRegular,
  },
  img_arrow: {
    width: 9,
    height: 14,
    marginRight: 32,
  },
  btn_notlisted: {
    width: wp('100%'),
    height: hp('9%'),
    backgroundColor: colors.blue_mainColorApp_5,
    justifyContent: 'center',
  },
  text_notlisted: {
    lineHeight: n(24),
    fontSize: n(16),
    textAlign: 'center',
    color: colors.grey_title,
    fontFamily: fonts.robotoRegular,
  },
});
