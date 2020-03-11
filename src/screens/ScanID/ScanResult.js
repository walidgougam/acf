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
import BtnFooter from '../../components/atoms/btn/BtnFooter';

export default class ScanResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      btnDeliver: true,
      btnHistory: false,
      familyProject: '',
      familyID: '', //supprimer la valeur de cette family ID
      familyActivity: [],
      foodActivity: [],
      type: '',
      healthArea: '',
      group: '',
      name: '',
      goodHealthArea: false,
      qrCodeID: '',
      nameOfFamily: '',
      btnIndividual: true,
      btnFamily: false,
      goBackFromScan: '',
    };
  }
  static navigationOptions = {
    header: null,
  };
  componentWillReceiveProps = nextProps => {
    if (nextProps !== null) {
      this.init();
    } else {
      console.log('false will receive props');
    }
  };

  componentDidMount = () => {
    this.init();
  };

  init = async () => {
    let {qrCodeID} = this.props.navigation?.state?.params || {};
    if (this.props.navigation?.state?.params?.goBackFromScan === true) {
      return (
        await this.getMemberData(qrCodeID),
        await this.getFamilyProject(qrCodeID),
        await this.setState({goodHealthArea: true, isLoading: false})
      );
    }
    await this.getFamilyProject(qrCodeID);
    await this.getMemberData(qrCodeID);
    await this.showMemberSameHealthArea(qrCodeID);
    this.setState({
      qrCodeID: qrCodeID,
      isLoading: false,
    });
  };

  getFamilyProject = async qrCodeID => {
    await database.ref('family').once('value', snap => {
      let _familyProject = '';
      let _healthArea = '';
      let _group = '';
      let _allIdFoodActivity = [];
      let snapshot = snap.val();
      let newSnapshot = Object.values(snapshot);
      for (let i = 0; i < newSnapshot.length; i++) {
        if (newSnapshot[i].uuid === qrCodeID) {
          _familyProject = newSnapshot[i].project_title;
          _healthArea = newSnapshot[i].healtharea;
          _group = newSnapshot[i].group;
          _allIdFoodActivity.push(newSnapshot[i].food_activity);
        }
      }
      this.setState({
        familyProject: _familyProject,
        healthArea: _healthArea,
        group: _group,
      });
      this.getFamilyActivity(..._allIdFoodActivity);
    });
  };

  getFamilyActivity = async IDFoodActivity => {
    await database.ref('food').once('value', snap => {
      let snapshot = snap.val();
      let _familyActivity = [];
      for (let i = 0; i < 10; i++) {
        if (
          IDFoodActivity !== undefined &&
          IDFoodActivity[i] !== undefined &&
          snapshot[IDFoodActivity[i]] !== undefined
        ) {
          _familyActivity.push(snapshot[IDFoodActivity[i]]);
        }
      }
      this.setState({
        familyActivity: _familyActivity,
        type: 'food',
      });
    });
  };

  getMemberData = async qrCodeID => {
    await database.ref('members').once('value', snap => {
      let _name = '';
      let _familyID = '';
      let _foodActivity = [];
      let snapshot = snap.val();
      let newSnapshot = Object.values(snapshot);
      for (let i = 0; i < newSnapshot.length; i++) {
        if (newSnapshot[i] && newSnapshot[i].familyUuid === qrCodeID) {
          _name = newSnapshot[i].name;
          _familyID = newSnapshot[i].familyID;
          if (newSnapshot[i].foodActivity !== undefined) {
            _foodActivity.push({
              food: [...newSnapshot[i].foodActivity],
              firstName: newSnapshot[i].first_name,
            });
          } else {
            _foodActivity.push({
              food: [],
              firstName: '',
            });
          }
        } else {
          console.log('get member data impossible');
        }
      }
      this.setState({
        name: _name,
        familyID: _familyID,
        foodActivity: _foodActivity,
      });
    });
  };

  showMemberSameHealthArea = () => {
    database
      .ref('acf_owner')
      .child(auth.currentUser?.uid)
      .once('value', snap => {
        let snapshot = snap.val();
        let newSnapshot = Object.values(snapshot);
        let _healthAreaAcfOwner = newSnapshot[1].map(
          myHealthArea => myHealthArea,
        );
        const goodHealthArea =
          _healthAreaAcfOwner.find(
            myHealthArea =>
              myHealthArea?.toLowerCase() ===
              this.state.healthArea?.toLowerCase(),
          ) !== undefined;
        this.setState({goodHealthArea});
      });
  };

  lineIndividualOrFamily = type => {
    switch (type) {
      case 'individual':
        return this.setState({
          btnIndividual: true,
          btnFamily: false,
        });
      case 'family':
        return this.setState({
          btnIndividual: false,
          btnFamily: true,
        });
    }
  };

  _renderLoading = () => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
        }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  };

  _renderErrorHealthArea() {
    return (
      <View
        style={{
          alignItems: 'center',
          flex: 1,
          width: '100%',
          justifyContent: 'center',
        }}>
        <Text style={{color: 'red', fontSize: 20, textAlign: 'center'}}>
          {t('no_access')}
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

  renderNoActivity = () => {
    return (
      <View style={[styles.white_bloc_text, {justifyContent: 'center'}]}>
        <Text>
          {this.state.name} {t('not_registred')}
        </Text>
      </View>
    );
  };

  renderFoodActivity = () => {
    let all = [];
    this.state.foodActivity.map(e => {
      for (let i = 0; i < e.food.length; i++)
        all.push({...e.food[i], firstName: e.firstName});
    });
    return (
      <View style={styles.white_bloc_text}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {all.map((activity, index) => {
            return (
              <ActivityCard
                type={this.state.type}
                firstName={activity.firstName}
                familyProject={this.state.familyProject}
                detail={activity.detail}
                title={activity.title}
              />
            );
          })}
        </ScrollView>
      </View>
    );
  };

  render() {
    if (this.state.isLoading) return this._renderLoading();
    if (this.state.isLoading === false && this.state.goodHealthArea === false)
      return this._renderErrorHealthArea();
    return (
      <View style={styles.container}>
        <View style={styles.bloc_blue_top}>
          <View style={styles.wrapper_header_arrow}>
            <View style={{marginTop: 24}}>
              <ArrowGoBack
                style={styles.arrow_goback}
                press={() => this.props.navigation.goBack()}
              />
            </View>
            <TouchableOpacity
              style={styles.wrapper_edit_profile}
              onPress={() => {
                this.props.navigation.navigate('ListMembers', {
                  familyID: this.state.familyID,
                  qrCodeID: this.props.navigation.state.params.qrCodeID,
                });
              }}>
              <Text style={styles.text_edit_profile}>Edit profile</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.wrapper_header_family}>
            <Text style={styles.text_header_family}>{this.state.name}</Text>
            <Text style={styles.text_header_family}>
              {this.state.healthArea}
            </Text>
          </View>
          <View style={styles.wrapper_header_addActivity}>
            <TouchableOpacity
              style={styles.btn_activity}
              onPress={() => {
                this.props.navigation.navigate('ListMembersFoodActivity', {
                  familyID: this.state.familyID,
                  qrCodeID: this.props.navigation.state.params.qrCodeID,
                });
              }}>
              <Text style={styles.text_activity}>{t('add_individual')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btn_activity}
              onPress={() => {
                this.props.navigation.navigate('EditFamilyFoodActivity', {
                  familyID: this.state.familyID,
                  from: 'family',
                });
              }}>
              <Text style={styles.text_activity}>{t('add_family')}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.wrapper_individual_family}>
            <TouchableOpacity
              style={[
                styles.btn_individual_family,
                this.state.btnIndividual && {borderBottomWidth: 4},
              ]}
              onPress={() => {
                this.lineIndividualOrFamily('individual');
              }}>
              <Text style={styles.text_individual_family}>
                {t('individual')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.btn_individual_family,
                this.state.btnFamily && {borderBottomWidth: 4},
              ]}
              onPress={() => {
                this.lineIndividualOrFamily('family');
              }}>
              <Text style={styles.text_individual_family}>{t('family')}</Text>
            </TouchableOpacity>
          </View>
        </View>
        {this.state.btnIndividual ? (
          this.state.foodActivity && this.state.foodActivity.length > 0 ? (
            this.renderFoodActivity()
          ) : (
            this.renderNoActivity()
          )
        ) : this.state.familyActivity.length > 0 ? (
          <View style={styles.white_bloc_text}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {this.state.familyActivity.map((activity, index) => {
                return (
                  <ActivityCard
                    type={this.state.type}
                    familyProject={this.state.familyProject}
                    detail={activity.detail}
                    title={activity.title}
                  />
                );
              })}
            </ScrollView>
          </View>
        ) : (
          this.renderNoActivity()
        )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.blue_mainColorApp,
  },
  bloc_blue_top: {
    marginHorizontal: 17,
  },
  wrapper_header_arrow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  arrow_goback: {
    marginTop: 64,
  },
  wrapper_edit_profile: {
    marginTop: 31,
    backgroundColor: color.white,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 2,
    elevation: 9,
  },
  text_edit_profile: {
    color: color.blue_mainColorApp,
  },
  wrapper_header_family: {},
  text_header_family: {
    color: color.white,
    marginBottom: 15,
  },
  wrapper_header_addActivity: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  btn_activity: {
    backgroundColor: color.green_line_tabBAr,
    width: '48%',
    padding: 10,
    alignItems: 'center',
    borderRadius: 3,
    elevation: 9,
  },
  text_activity: {
    color: color.white,
    fontSize: 12,
  },
  wrapper_individual_family: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btn_individual_family: {
    width: '48%',
    borderBottomColor: color.green_line_tabBAr,
    alignItems: 'center',
    paddingBottom: 13,
  },

  individual_family: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: n(41),
    // height: 150,
    marginHorizontal: n(16),
  },
  text_individual_family: {
    color: color.white,
  },
  white_bloc_text: {
    backgroundColor: color.white,
    width: '100%',
    flex: 1,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingHorizontal: 20,
  },
});
