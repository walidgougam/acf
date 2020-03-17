import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  AsyncStorage,
  Platform,
  Alert,
  Dimensions,
} from 'react-native';
import HomeHeader from '../../components/molecules/HomeHeader';
import colors from '../../constants/colors/colors';
import sizing from '../../constants/typography/sizing';
import fonts from '../../constants/typography/fonts';
import image from '../../../assets/image';
import ModalHome from '../Home/ModalHome';
import {n} from '../../Helpers'; //normalize
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {database, auth} from '../../../ConfigFirebase';
import NetInfo from '@react-native-community/netinfo';
import {addNewFamily, getActivityFoodData} from '../../lib/sync';
import {Base64} from 'js-base64';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      btn_backgroundColor: false,
      showModal: false,
      projectTitle: '',
      supervisor: '',
    };
    this.refModal = React.createRef();

    let process = {isFinish: false};
    this.unsubscribe = NetInfo.addEventListener(state => {
      if (state.isConnected && !process.isFinish) {
        process.isFinish = true;
        addNewFamily();
        setTimeout(() => {
          process.isFinish = false;
        }, 500);
      }
    });
  }

  static navigationOptions = {
    header: null,
  };

  componentDidMount = async () => {
    let projectTitle = await AsyncStorage.getItem('projectTitle');
    let supervisor = await AsyncStorage.getItem('supervisor');
    this.setState({
      projectTitle,
      supervisor,
    });
    this.getHealthArea();
  };

  getHealthArea = () => {
    database
      .ref('members')
      .child(auth.currentUser.uid)
      .once('value', snap => {
        let snapshot = snap.val();
        getActivityFoodData(snapshot);
      });
  };

  imageProject = () => {
    //ca sera food ou health, faire un switch.
    return image.food;
  };

  pressBtn = index => {
    switch (index) {
      case 0:
        return this.props.navigation.navigate('ScannScreen');
      // case 1:
      //   return this.props.navigation.navigate('SearchIdByNumber');
      case 1:
        return this.setState({
          showModal: true,
        });
    }
  };

  render() {
    const dataHome = [
      {
        title: 'SCANNEZ UNE CARTE', //SCAN ID CARD
        image: image.qrcode_white,
      },
      // {title: 'ID NUMBER', image: image.htag},
      {title: 'NOUVELLE FAMILLE', image: image.family_white}, //new family
    ];

    return (
      <View style={styles.container}>
        {console.log(Dimensions.get('window').width)}
        <HomeHeader navigation={this.props.navigation} />
        <View style={styles.wrapper_project}>
          <View style={styles.wrapper_project_left}>
            <Image source={image.food} style={styles.img_project} />
            <Text style={styles.text_project} numberOfLines={1}>
              {this.state.projectTitle}
            </Text>
          </View>
          <TouchableOpacity
            style={
              Platform === 'ios'
                ? {
                    backgroundColor: colors.white,
                    shadowOffset: {width: 2, height: 2},
                    shadowColor: colors.black,
                    shadowOpacity: 0.2,
                  }
                : {
                    backgroundColor: colors.white,
                    elevation: 6,
                  }
            }
            onPress={() => this.props.navigation.navigate('ProjectScreen')}>
            <Text style={styles.text_change}>{t('change').toUpperCase()}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.background_blue}>
          {dataHome.map((item, index) => {
            return (
              <TouchableOpacity
                //underlayColor="transparent"
                key={index}
                style={styles.btn}
                onPress={() => this.pressBtn(index)}>
                {/* faire en sorte lorsquon clique sur un bouton quil se colorie en vert*/}
                <View style={styles.wrapper_btn}>
                  <Text style={styles.text_btn}>{item.title}</Text>
                  <Image style={styles.img} source={item.image} />
                </View>
              </TouchableOpacity>
            );
          })}
          {this.state.supervisor === 'supervisor' && (
            <TouchableOpacity
              //underlayColor="transparent"
              style={styles.btn}
              onPress={() => this.props.navigation.navigate('AdvancedSearch')}>
              {/* faire en sorte lorsquon clique sur un bouton quil se colorie en vert*/}
              <View style={styles.wrapper_btn}>
                <Text style={styles.text_btn}>RECHERCHE AVANCÉE</Text>
                <Image style={styles.img} source={image.search} />
              </View>
            </TouchableOpacity>
          )}
        </View>
        <Text
          style={styles.link_terms}
          onPress={() => this.props.navigation.navigate('TermsOfService')}>
          {t('terms_service')}
        </Text>
        <ModalHome
          // typeOfProject={this.projectTitle()}
          projectTitle={this.state.projectTitle}
          navigation={this.props.navigation}
          showModal={this.state.showModal}
          ref={this.refModal}
          hideModal={() => this.setState({showModal: !this.state.showModal})}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: hp('100%'),
  },
  wrapper_project: {
    height: hp('6.1%'),
    marginHorizontal: n(sizing.M),
    paddingHorizontal: n(10),
    marginBottom: n(20),
    borderWidth: 1,
    borderColor: colors.grey_title_10, // une opacity a mettre mais laquelle??
    borderRadius: n(4),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  wrapper_project_left: {
    flexDirection: 'row',
    width: '73%',
  },
  img_project: {
    width: wp('5.1%'),
    height: hp('4%'),
  },
  text_project: {
    color: colors.grey_title,
    fontSize: n(16),
    lineHeight: n(24),
    marginLeft: n(10),
    fontFamily: fonts.robotoRegular,
  },
  btn_change: {},
  text_change: {
    paddingLeft: n(9),
    paddingRight: n(9),
    color: colors.blue_mainColorApp,
    lineHeight: n(20),
    fontSize: n(11),
    fontFamily: fonts.robotoMedium,
  },
  background_blue: {
    backgroundColor: colors.blue_mainColorApp,
    width: wp('100%'),
    height: hp('100%'),
    borderRadius: n(20),
  },
  btn: {
    borderBottomColor: colors.white_40,
    borderBottomWidth: 1,
    //height: 90,
    //justifyContent: 'center',
  },
  wrapper_btn: {
    height: hp('13.5%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: n(16),
  },
  text_btn: {
    lineHeight: n(30),
    fontSize: n(22),
    color: colors.white,
    // fontFamily: Futura - Bold,
  },
  img: {
    width: n(30),
    height: n(30),
  },
  link_terms: {
    color: colors.white,
    lineHeight: n(24),
    fontSize: n(16),
    textDecorationLine: 'underline',
    position: 'absolute',
    bottom: 40,
    width: wp('100%'),
    textAlign: 'center',
    fontFamily: fonts.robotoRegular,
  },
});
