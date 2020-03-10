import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  AsyncStorage,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import MainHeader from '../../components/molecules/MainHeader';
import typography from '../../constants/typography/textDesign';
import colors from '../../constants/colors/colors';
import t from '../../lib/translate';
import fonts from '../../constants/typography/fonts';
import BtnFooter from '../../components/atoms/btn/BtnFooter';
import {ScrollView} from 'react-native-gesture-handler';
import Card from '../../components/atoms/card/Card';
import {n} from '../../Helpers'; //normalize
import {getActivityFoodData} from '../../lib/sync';
import {f, database, auth} from '../../../ConfigFirebase';
import NetInfo from '@react-native-community/netinfo';

export default class FoodActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      foodActivity: [],
      checkedActivities: [],
      food: [],
      foodKey: [],
      idSnap: '',
      idOfCurrentMember: '',
      idAcfOwner: '',
      idOfCurrentFamily: '',
    };
  }
  static navigationOptions = {
    header: null,
  };

  componentDidMount = async () => {
    let idOfCurrentMember = await AsyncStorage.getItem('idOfCurrentMember');
    let idOfCurrentFamily = await AsyncStorage.getItem('idOfCurrentFamily');
    let id = await AsyncStorage.getItem('idOfAcfOwner');
    this.setState({
      idOfCurrentMember,
      idAcfOwner: id,
      idOfCurrentFamily,
    });

    NetInfo.fetch().then(async state => {
      let activityFoodData;
      let activityFoodKey;
      if (state.isConnected) {
        database
          .ref('acf_owner')
          .child(auth.currentUser.uid)
          .once('value', async snap => {
            let snapshot = snap.val();
            const {health_area} = snapshot;
            getActivityFoodData(
              health_area,
              (_activityFoodData, _activityFoodKey) => {
                this.setState({
                  food: _activityFoodData || [],
                  foodKey: _activityFoodKey,
                });
              },
            );
          });
      } else {
        activityFoodData = JSON.parse(
          await AsyncStorage.getItem('health_area_food_activity'),
        );
        activityFoodKey = JSON.parse(
          await AsyncStorage.getItem('health_area_food_activity'),
        );
        this.setState({
          food: activityFoodData || [],
          foodKey: activityFoodKey,
        });
      }
    });
  };

  btnNext = e => {
    let {membersFamily, familyData} = {
      ...this.props.navigation.state.params,
    };

    const food_activity_object = this.state.foodKey
      .filter((key, index) => this.state.checkedActivities[index])
      .map((id, index) => ({
        id,
        ...this.state.food[index],
      }));
    console.log(food_activity_object, 'food activity object');
    this.props.navigation.navigate('DataAcceptation', {
      membersFamily,
      familyData,
      food_activity: food_activity_object,
    });
  };

  // fonction a reecrire
  chooseFoodActivity = index => {
    let checkedActivities = this.state.checkedActivities;
    checkedActivities[index] = !checkedActivities[index];
    this.setState({
      checkedActivities,
    });
  };

  essai = e => {
    this.setState({
      foodActivity: [
        ...this.state.foodActivity,
        {
          title: e.title,
          detail: e.detail,
        },
      ],
    });
  };

  render() {
    let {membersFamily, familyData} = {
      ...this.props.navigation.state.params,
    };
    return (
      <View style={styles.container}>
        {/* name of family must be a props which will be different depending on family*/}
        <MainHeader
          title="Food Activity"
          topic={membersFamily[0].name ? membersFamily[0].name + ' family' : ''}
          press={() => this.props.navigation.goBack()}
        />
        <View style={styles.wrapper_white_background}>
          <ScrollView>
            <View style={styles.wrapper_food_activity}>
              <Text style={styles.text_select_food}>
                {t('select_food_activity')}
              </Text>
              {this.state.food.length > 0 &&
                this.state.food.map((data, index) => {
                  return (
                    <TouchableOpacity
                      onPress={e => {
                        this.chooseFoodActivity(index);
                        this.essai(data);
                      }}>
                      <Card
                        checked={this.state.checkedActivities[index]}
                        index={index}
                        title={data?.title}
                        detail={data?.detail}
                        type="food"
                        press={() => this.chooseFoodActivity(index)}
                      />
                    </TouchableOpacity>
                  );
                })}
              {this.state.food.length == 0 && (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                  }}>
                  <ActivityIndicator size="large" color="#0000ff" />
                </View>
              )}
            </View>
          </ScrollView>
        </View>
        <BtnFooter
          title="NEXT"
          press={e => this.btnNext(e)}
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
  wrapper_food_activity: {
    marginHorizontal: n(16),
  },
  text_select_food: {
    marginTop: n(24),
    fontSize: n(14),
    lineHeight: n(19),
    color: colors.grey_enter_select,
    fontFamily: fonts.robotoRegular,
  },
});
