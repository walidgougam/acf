import React, {Component} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import colors from '../../constants/colors/colors';
import ArrowGoBack from '../../components/atoms/ArrowGoBack';
import sizing from '../../constants/typography/sizing';
import typography from '../../constants/typography/textDesign';
import NextBtn from '../../components/atoms/btn/NextBtn';
import {database} from '../../../ConfigFirebase';

export default class FamilyView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      first_name: '',
      name: '',
      age: '',
      healthArea: '',
      projectTitle: '',
    };
  }
  static navigationOptions = {
    header: null,
  };

  componentDidMount() {
    let familyId = this.props.navigation.state.params.familyId;
    this.getData(familyId);
    this.getDataFromQrcode(familyId);
    this.setState({
      isLoading: false,
    });
  }

  getData = idFamily => {
    database
      .ref('family/')
      .child(idFamily)
      .once('value', snap => {
        let snapshot = snap.val();
      });
  };

  getDataFromQrcode = _familyId => {
    database.ref('members').once('value', snap => {
      let snapshot = snap.val();
      let newSnapshot = Object.values(snapshot);
      for (let i = 0; i < newSnapshot.length; i++) {
        if (newSnapshot[i].familyUuid === _familyId) {
          this.setState({
            name: newSnapshot[i].name,
            first_name: newSnapshot[i].first_name,
            age: newSnapshot[i].age,
          });
          this.getHealthAreaFromFamily(newSnapshot[i].familyID);
        }
      }
    });
  };

  getHealthAreaFromFamily(idOfFamily) {
    console.log(idOfFamily, 'idoffamily');
    database
      .ref('family')
      .child(idOfFamily)
      .once('value', snap => {
        let snapshot = snap.val();
        console.log(snapshot.project_title, 'snapshotshoshotshot');
        this.setState({
          healthArea: snapshot.healtharea,
          projectTitle: snapshot.project_title,
        });
      });
  }

  render() {
    const {isLoading, first_name, name, age, healthArea} = this.state;
    return isLoading ? (
      <View></View>
    ) : (
      <View style={styles.container}>
        <View style={styles.wrapper_head1}>
          <ArrowGoBack
            press={() => {
              this.props.navigation.navigate('ScannScreen');
            }}
          />
          <TouchableOpacity style={styles.btn_view_profile}>
            <Text style={styles.text_view_profile}> View full profile </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.wrapper_head2}>
          {/* <Text style={styles.status_member_family}>{first_name}</Text> */}
          <Text style={styles.member_name}>{name}</Text>
          <Text style={styles.member_age}>{age}</Text>
          <Text style={styles.member_health_area}>{healthArea}</Text>
        </View>
        <View style={styles.wrapper_white_background}>
          <Text style={styles.description}>
            {first_name} isn’t registered to any health program.
          </Text>
          <NextBtn
            style={{
              backgroundColor: colors.green_btn_icon,
              marginTop: sizing.M,
            }}
            title={'ADD A PROGRAM'}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.blue_mainColorApp,
    flex: 1,
  },
  wrapper_head1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: sizing.M,
    marginTop: 24,
  },
  btn_view_profile: {
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text_view_profile: {
    ...typography.headerTitle,
    paddingVertical: 3,
    paddingHorizontal: 10,
  },
  wrapper_head2: {
    margin: 16,
  },
  status_member_family: {
    ...typography.bigTitle,
  },
  member_name: {
    ...typography.bigTitle,
  },
  member_age: {
    ...typography.title,
    color: colors.white,
    fontSize: 20,
    marginTop: sizing.M,
  },
  member_health_area: {
    ...typography.input,
    backgroundColor: 'transparent',
    color: colors.white,
    marginTop: 4,
  },
  wrapper_white_background: {
    flex: 1,
    backgroundColor: colors.white,
    borderColor: colors.grey_title_20, // not sure about the right grey and right opacity
    borderTopLeftRadius: sizing.XS,
    borderTopRightRadius: sizing.XS,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  description: {
    ...typography.input,
    marginHorizontal: sizing.XL,
    color: colors.grey_title,
    textAlign: 'center',
  },
});
