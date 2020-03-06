import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Text,
} from 'react-native';
import colors from '../../constants/colors/colors';
import t from '../../lib/translate';
import CardSearch from '../../components/atoms/card/CardSearch';
import MainHeader from '../../components/molecules/MainHeader';
import typography from '../../constants/typography/textDesign';
import fonts from '../../constants/typography/fonts';
import image from '../../../assets/image.js';
import sizing from '../../constants/typography/sizing';
import {n} from '../../Helpers'; //normalize
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {database, auth} from '../../../ConfigFirebase';
import NetInfo from '@react-native-community/netinfo';

export default class SearchResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataMembers: [],
      isLoading: true,
      isConnectedToWifi: Boolean,
    };
  }

  static navigationOptions = {
    header: null,
  };

  componentDidMount() {
    this.dataResultWithFilter();
    this.isConnectedToWifi();
  }

  isConnectedToWifi = () => {
    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        this.setState({
          isConnectedToWifi: true,
        });
        console.log('is connected to wifi select project ');
      } else {
        this.setState({
          isConnectedToWifi: false,
        });
        console.log('it is not connected to wifi select project');
      }
    });
  };

  messageNoConnection = () => {
    if (!this.state.isConnectedToWifi) {
      return (
        <View
          style={{
            backgroundColor: 'red',
            width: '100%',
          }}>
          <Text>no wifi connection...</Text>
        </View>
      );
    }
  };

  dataResultWithFilter = () => {
    let {first_name, name, age} = this.props.navigation.state.params;
    let all = [];
    let filterByAcfOwner = [];
    let filterBy;
    let newDataBase;
    database.ref('members').once('value', snapshot => {
      snapshot.forEach(snap => {
        all.push(snap.val());
        filterByAcfOwner = all.filter(value => {
          return value.id_acf_owner === auth.currentUser.uid;
        });
        filterBy = filterByAcfOwner.filter(val => {
          return (
            (val.first_name.toLowerCase() === first_name.toLowerCase() &&
              val.first_name !== '') ||
            (val.name.toLowerCase() === name.toLowerCase() &&
              val.name !== '') ||
            (val.age === age && val.age !== '')
          );
        });
      });
      this.setState({
        dataMembers: filterBy,
        isLoading: false,
      });
    });
  };

  render() {
    return this.state.isLoading ? (
      <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
        <ActivityIndicator size="large" color={colors.blue_mainColorApp} />
      </View>
    ) : (
      <View style={styles.container}>
        {this.messageNoConnection()}
        <MainHeader
          search
          title={t('searchResult')}
          press={() => {
            this.props.navigation.goBack();
          }}
        />
        <View style={[styles.wrapper_white_background, {height: '100%'}]}>
          <ScrollView>
            {this.state.dataMembers.map((data, key) => {
              return (
                <CardSearch
                  navigation={this.props.navigation}
                  search
                  firstName={data.first_name}
                  name={data.name}
                  gender={data.gender}
                  age={data.age}
                  householder={true}
                  town={data.town}
                  picture={image.right_arrow}
                  dataMember={this.state.dataMembers}
                  familyID={data.familyID}
                />
              );
            })}
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: wp('100%'),
    backgroundColor: 'yellow',
  },
  wrapper_white_background: {
    ...typography.wrapper_white_background,
  },
  text_about: {
    width: wp('100%'),
    marginHorizontal: n(16),
    marginVertical: n(20),
    marginTop: n(20),
    fontSize: n(14),
    color: colors.grey_title,
    fontFamily: fonts.robotoRegular,
    lineHeight: n(16),
  },
  wrapper_btn_gender: {
    marginTop: n(sizing.XL),
    flexDirection: 'row',
    marginLeft: n(sizing.M),
    flexWrap: 'wrap',
  },
  btn_gender: {
    flexDirection: 'row',
    width: wp('50%'),
    alignItems: 'center',
  },
  text_gender: {
    marginLeft: n(6),
  },
  wrapper_input: {
    marginHorizontal: sizing.M,
    marginTop: sizing.XL,
    borderBottomColor: colors.grey_title_10,
    borderBottomWidth: 1,
    paddingBottom: n(11),
  },
});
