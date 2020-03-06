import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableHighlight,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import ArrowGoBack from '../../components/atoms/ArrowGoBack';
import color from '../../constants/colors/colors';
import fonts from '../../constants/typography/fonts';
import ActivityCard from '../../components/molecules/ActivityCard';
import {n} from '../../Helpers'; //normalize
import {database, auth} from '../../../ConfigFirebase';
import NextBtn from '../../components/atoms/btn/NextBtn';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default class DeliverAndHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      btnDeliver: true,
      btnHistory: false,
      familyProject: '',
      familyID: '',
      healthArea: '',
      group: '',
      name: '',
      goodHealthArea: false,
      qrCodeID: '',
    };
  }
  static navigationOptions = {
    header: null,
  };

  componentDidMount = () => {
    let {qrCodeID} = this.props.navigation.state.params;
    this.getFamilyProject(qrCodeID);
    this.getMemberData(qrCodeID);
    this.showMemberSameHealthArea(qrCodeID);
    this.setState({
      qrCodeID: qrCodeID,
      isLoading: false,
    });
  };

  getFamilyProject = qrCodeID => {
    database.ref('family').once('value', snap => {
      let _familyProject = '';
      let _healthArea = '';
      let _group = '';
      let snapshot = snap.val();
      let newSnapshot = Object.values(snapshot);
      for (let i = 0; i < newSnapshot.length; i++) {
        if (newSnapshot[i].uuid === qrCodeID) {
          _familyProject = newSnapshot[i].project_title;
          _healthArea = newSnapshot[i].healtharea;
          _group = newSnapshot[i].group;
        }
      }
      this.setState({
        familyProject: _familyProject,
        healthArea: _healthArea.toLowerCase(),
        group: _group,
      });
    });
  };

  getMemberData = qrCodeID => {
    database.ref('members').once('value', snap => {
      let _name = '';
      let _familyID = '';
      let snapshot = snap.val();
      let newSnapshot = Object.values(snapshot);
      for (let i = 0; i < newSnapshot.length; i++) {
        if (newSnapshot[i].familyUuid === qrCodeID) {
          console.log(newSnapshot[i], 'blabla');
          _name = newSnapshot[i].name;
          _familyID = newSnapshot[i].familyID;
        }
      }
      this.setState({
        name: _name,
        familyID: _familyID,
      });
    });
  };

  showMemberSameHealthArea = () => {
    database
      .ref('acf_owner')
      .child(auth.currentUser.uid)
      .once('value', snap => {
        let snapshot = snap.val();
        let newSnapshot = Object.values(snapshot);
        let _healthAreaAcfOwner = [];
        for (let i = 0; i < newSnapshot.length; i++) {
          _healthAreaAcfOwner.push(
            newSnapshot[1][i] !== undefined && newSnapshot[1][i].toLowerCase(),
          );
        }
        if (_healthAreaAcfOwner.includes(this.state.healthArea)) {
          this.setState({
            goodHealthArea: true,
          });
        }
      });
  };

  focusDeliverOrHistory = type => {
    switch (type) {
      case 'deliver':
        return this.setState({
          btnDeliver: true,
          btnHistory: false,
        });
      case 'history':
        return this.setState({
          btnDeliver: false,
          btnHistory: true,
        });
    }
  };
  render() {
    const {
      firstName,
      age,
      dataMember,
      familyID,
    } = this.props.navigation.state.params;
    const {navigation} = this.props;
    return this.state.isLoading ? (
      <View>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    ) : this.state.goodHealthArea ? (
      <View style={styles.container}>
        <View style={styles.wrapper_header_full_profile}>
          <ArrowGoBack
            press={() => {
              navigation.navigate('ScannScreen');
            }}
          />
          <TouchableOpacity
            style={styles.btn_full_profile}
            onPress={() => {
              this.props.navigation.navigate('EditMainInformation', {
                familyID: this.state.familyID,
                qrCodeID: this.state.qrCodeID,
              });
            }}>
            <Text style={styles.text_full_profile}> View full profile </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.wrapper_name}>
          <Text style={[styles.text_name, {opacity: 0}]}>
            {firstName ? firstName : ''}
          </Text>
          <Text style={styles.text_name}>
            {this.state.name ? this.state.name : ''}
          </Text>
        </View>
        <View style={styles.wrapper_age_city}>
          <Text style={styles.text_age}> {age ? age : ''} </Text>
          <Text style={styles.text_city}>
            {this.state.group ? this.state.group + ',' : ''}
            {this.state.healthArea}
          </Text>
        </View>
        <View style={styles.bothButtons}>
          <TouchableHighlight
            onPress={() => {
              this.focusDeliverOrHistory('deliver');
            }}
            style={[
              styles.btn_history,
              {
                marginRight: 10,
              },
              this.state.btnDeliver && {
                borderBottomWidth: 4,
              },
            ]}>
            <Text
              style={[
                styles.text_btn,
                !this.state.btnDeliver && styles.opacityBtn,
              ]}>
              TO DELIVER
            </Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => {
              this.focusDeliverOrHistory('history');
            }}
            style={[
              styles.btn_history,
              this.state.btnHistory && {
                borderBottomWidth: 4,
              },
            ]}>
            <Text
              style={[
                styles.text_btn,
                !this.state.btnHistory && styles.opacityBtn,
              ]}>
              HISTORY
            </Text>
          </TouchableHighlight>
        </View>
        <View style={[styles.wrapper_white_background]} />
        <ScrollView>
          <ActivityCard familyProject={this.state.familyProject} />

          <NextBtn
            style={{
              backgroundColor: color.green_btn_icon,
              marginTop: 10,
              marginLeft: 100,
              width: 200,
              alignContent: 'center',
            }}
            title={'ADD A PROGRAM'}
            press={() => this.props.navigation.navigate('EditFoodActivity')}
          />
        </ScrollView>
      </View>
    ) : (
      <View
        style={{
          alignItems: 'center',
          flex: 1,
          width: '100%',
          justifyContent: 'center',
        }}>
        <Text style={{color: 'red', fontSize: 20, textAlign: 'center'}}>
          Vous n'avez pas les accès a ces données.
        </Text>
        <TouchableOpacity
          style={{marginTop: 30}}
          onPress={() => {
            this.props.navigation.navigate('ScannScreen');
          }}>
          <Text
            style={{
              textAlign: 'center',
              width: 100,
              backgroundColor: color.blue_mainColorApp,
              padding: 10,
              borderRadius: 5,
            }}>
            Retour
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: color.blue_mainColorApp,
    flex: 1,
  },
  wrapper_header_full_profile: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: n(16),
    marginTop: 24,
  },
  btn_full_profile: {
    borderRadius: n(2),
    backgroundColor: color.white,
    width: wp('26.1%'),
    height: hp('3.6%'),
    marginTop: n(31),
    justifyContent: 'center',
    alignItems: 'center',
  },
  text_full_profile: {
    color: color.blue_mainColorApp,
    lineHeight: n(20),
    fontSize: n(11),
    fontFamily: fonts.robotoMedium,
  },
  wrapper_name: {
    marginHorizontal: n(16),
    marginTop: n(10),
  },
  text_name: {
    fontSize: n(30),
    color: color.white,
    lineHeight: n(36),
    // fontFamily: future-bold
  },
  wrapper_age_city: {
    marginLeft: n(16),
    marginTop: n(15),
  },
  text_age: {
    color: color.white,
    fontSize: n(20),
    lineHeight: n(24),
    fontFamily: fonts.robotoBold,
  },
  text_city: {
    color: color.white,
  },
  bothButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: n(41),
    // height: 150,
    marginHorizontal: n(16),
  },
  btn_history: {
    borderBottomColor: color.green_line_tabBAr,
    width: wp('44.2%'),
    alignItems: 'center',
    paddingBottom: n(13),
    // marginBottom: 75,
  },
  text_btn: {
    color: color.white,
  },
  wrapper_white_background: {
    borderTopLeftRadius: n(12),
    borderTopRightRadius: n(12),
    position: 'absolute',
    bottom: 0,
    backgroundColor: color.white,
    width: wp('100%'),
    height: hp('58%'),
  },
  opacityBtn: {
    opacity: 0.73,
  },
});
