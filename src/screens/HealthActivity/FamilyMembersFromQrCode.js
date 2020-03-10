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
  }
  static navigationOptions = {
    header: null,
  };

  componentDidMount = async () => {
    const {familyId} = this.props.navigation.state.params;
    database
      .ref('family/' + auth.currentUser.uid + '/')
      .child(familyId)
      .on('value', snap => {
        let snapshot = snap.val();
      });
  };

  render() {
    const {loading, dataFamily} = this.state;
    return (
      <View style={styles.container}>
        <MainHeader
          title={t('register_family')}
          topic="name of family"
          press={() => this.props.navigation.goBack()}
        />
        <View style={styles.wrapper_white_background}>
          <ScrollView>
            <View style={{marginHorizontal: n(16)}}>
              <Text>hello</Text>
              {dataFamily.map((family, index) => {
                return (
                  family.first_name !== '' && (
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
                  )
                );
              })}
            </View>
            <View style={{alignItems: 'center', marginVertical: 28}}>
              <BtnMain
                press={() => this.props.navigation.navigate('AddMembers')}
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
