import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  AsyncStorage,
  TouchableOpacity,
} from 'react-native';
import Card from '../../components/atoms/card/Card';
import MainHeader from '../../components/molecules/MainHeader';
import BtnFooter from '../../components/atoms/btn/BtnFooter';
import BtnMain from '../../components/atoms/btn/BtnMain';
import typography from '../../constants/typography/textDesign';
import t from '../../lib/translate';
import colors from '../../constants/colors/colors';
import {n} from '../../Helpers'; //normalize
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {database, auth} from '../../../ConfigFirebase';

export default class ListMembersFoodActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataFamily: [],
      loading: true,
      idOfCurrentMember: '',
      idOfCurrentFamily: '',
      members: [],
      membersKeys: [],
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
    //this.getDataFromFamily();
  }
  static navigationOptions = {
    header: null,
  };

  componentDidMount = () => {
    database
      .ref('members')
      .orderByChild('familyUuid')
      .equalTo(this.props.navigation.state.params.qrCodeID)
      .once('value', snap => {
        let snapshot = snap.val();
        const _members = Object.values(snapshot);
        const _membersKeys = Object.keys(snapshot);
        this.setState({
          members: _members,
          membersKeys: _membersKeys,
          loading: false,
        });
      });
    this.getDataFamily();
  };

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

  getDataFromFamily = () => {
    database
      .ref('/family')
      .child(auth.currentUser.uid)
      .on('child_added', async e => {
        this.setState({idOfCurrentFamily: e.key});
        await AsyncStorage.setItem('idOfCurrentFamily', e.key);
      });
  };

  getPost() {
    let tab = [];
    let newTab;
    let tabFilter = [];
    database.ref('members').once('value', snapshot => {
      snapshot.forEach(val => {
        tab.push(val.val());
        newTab = tab.filter(obj => {
          return obj.id_acf_owner === auth.currentUser.uid;
        });
      });
      tabFilter.push(...newTab);
      this.changeState(tabFilter);
    });
  }

  changeState = tabFilter => {
    let dataFamily = this.state.dataFamily;
    dataFamily.push(...tabFilter);
    this.setState({
      dataFamily,
      loading: false,
    });
  };

  btnNext = () => {
    // const {membersFamily, familyData} = this.props.navigation.state.params;
    const {
      familyData,
      familyID,
      qrCodeID,
    } = this.props.navigation?.state?.params;
    const {
      members,
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
    this.props.navigation.navigate('EditFoodActivity', {
      membersFamily: members,
      familyData: {
        province,
        territory,
        group,
        chieftaincy,
        healthzone,
        healtharea,
        village,
        gps,
        site,
      },
      familyID: familyID,
      qrCodeID: qrCodeID,
    });
  };

  genderDetail = family => {
    if (family.man) {
      return 'man';
    } else if (family.woman) {
      return 'woman';
    }
  };

  render() {
    const {loading} = this.state;
    const {familyData, qrCodeID} = this.props.navigation?.state?.params;
    return loading ? (
      <Text />
    ) : (
      <View style={styles.container}>
        <MainHeader
          title="Add activity member"
          topic={
            this.state.members ? this.state.members[0].name + ' family' : ''
          }
          press={() =>
            this.props.navigation.navigate('ScanResult', {
              goBackFromScan: true,
              qrCodeID,
            })
          }
        />
        <View style={styles.wrapper_white_background}>
          <ScrollView>
            <View style={{marginHorizontal: n(16)}}>
              {this.state.members.map((member, index) => {
                return (
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate('EditFamilyFoodActivity', {
                        familyID: member.familyID,
                        qrCodeID: member.familyUuid,
                        membersID: this.state.membersKeys[index],
                        from: 'member',
                      })
                    }>
                    <Card
                      title={member.first_name}
                      detail={this.genderDetail(member)}
                      age={member.age}
                      householder={member.isHouseholder}
                      index={index}
                      next
                    />
                  </TouchableOpacity>
                );
              })}
            </View>
            <View style={{alignItems: 'center', marginVertical: 28}}></View>
          </ScrollView>
        </View>
        <BtnFooter
          title="OK"
          press={() =>
            this.props.navigation.navigate('ScanResult', {
              goBackFromScan: true,
              qrCodeID,
            })
          }
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
});
