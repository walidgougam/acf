import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  AsyncStorage,
  Image,
} from 'react-native';
import Card from '../../components/atoms/card/Card';
import MainHeader from '../../components/molecules/MainHeader';
import BtnFooter from '../../components/atoms/btn/BtnFooter';
import BtnMain from '../../components/atoms/btn/BtnMain';
import typography from '../../constants/typography/textDesign';
import colors from '../../constants/colors/colors';
import {n} from '../../Helpers'; //normalize
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import image from '../../../assets/image';
import InputField from '../../components/atoms/forms/InputField';

export default class SearchByIdNumber extends Component {
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

  render() {
    return false ? (
      <Text></Text>
    ) : (
      <View style={styles.container}>
        <MainHeader
          title="By ID number"
          press={() => this.props.navigation.goBack()}
        />
        <View style={styles.wrapper_white_background}>
          <View style={{alignItems: 'center'}}>
            <Image
              source={image.logo_color}
              style={{width: 30, height: 60, marginTop: 20, marginBottom: 15}}
            />
            <Text style={{marginBottom: 10}}>ID</Text>
            <Text style={{marginBottom: 10}}>Enter Beneficiary ID</Text>
            <InputField
              title="Beneficiary ID"
              //   type="province"
              //   marginBottom={25}
              //   onChange={(type, value) => this.handleChangeInput(type, value)}
              //   value={province}
            />
          </View>
        </View>
        <BtnFooter
          title="Validate"
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
