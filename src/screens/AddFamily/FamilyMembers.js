import React, {Component} from 'react';
import {StyleSheet, View, Text, ScrollView, AsyncStorage} from 'react-native';
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

export default class FamilyMembers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataFamily: [],
      loading: true,
      idOfCurrentMember: '',
      idOfCurrentFamily: '',
    };
    //this.getDataFromFamily();
  }
  static navigationOptions = {
    header: null,
  };
  // componentDidMount = async () => {
  //   let idOfCurrentMember = await AsyncStorage.getItem('idOfCurrentMember');
  //   this.setState({
  //     idOfCurrentMember,
  //   });
  //   this.getPost();
  // };

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
      // snap.forEach(val =>  this.changeState(val););
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
    // database.ref('family/' + auth.currentUser.uid).push({
    //   idFamily: this.state.idOfCurrentFamily,
    //   idMember: this.state.idOfCurrentMember,
    // });
    const {membersFamily, familyData} = this.props.navigation.state.params;
    console.log(membersFamily, 'members family of family member');
    this.props.navigation.navigate('FoodActivity', {
      membersFamily,
      familyData,
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
    const {membersFamily} = this.props.navigation.state.params;

    return false ? (
      <Text></Text>
    ) : (
      <View style={styles.container}>
        <MainHeader
          title={t('register_family')}
          topic={membersFamily[0].name ? membersFamily[0].name + ' family' : ''}
          press={() => this.props.navigation.goBack()}
        />
        <View style={styles.wrapper_white_background}>
          <ScrollView>
            <View style={{marginHorizontal: n(16)}}>
              {membersFamily
                .filter(_family => {
                  return _family.first_name !== '';
                })
                .map((family, index) => {
                  return (
                    <View>
                      <Card
                        title={family.first_name}
                        detail={this.genderDetail(family)}
                        age={family.age}
                        householder={family.isHouseholder}
                        index={index}
                        type="family"
                      />
                    </View>
                  );
                })}
            </View>
            <View style={{alignItems: 'center', marginVertical: 28}}>
              <BtnMain
                press={() =>
                  this.props.navigation.navigate('AddMembers', {
                    oldMembersFamily: membersFamily,
                    addMoreMember: true,
                  })
                }
                title={t('add_member')}
                backgroundColor={colors.blue_mainColorApp}
                width={wp('44.2%')}
                size={n(12)}
                type="addMember"
              />
            </View>
          </ScrollView>
        </View>
        <BtnFooter
          title="NEXT"
          press={() => this.btnNext()}
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
