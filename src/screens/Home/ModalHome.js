import React, {Component} from 'react';
import {
  Modal,
  Portal,
  Text,
  Button,
  Provider,
  Platform,
} from 'react-native-paper';
import {StyleSheet, View, Image, TouchableHighlight} from 'react-native';
import images from '../../../assets/image';
import colors from '../../constants/colors/colors';
import sizing from '../../constants/typography/sizing';
import fonts from '../../constants/typography/fonts';
import {n} from '../../Helpers';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default class ModalHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  // componentDidMount() {
  //   AsyncStorage.setItem(
  //     'localStorageTypeOfProject',
  //     JSON.stringify(this.props.typeOfProject),
  //   );
  // }

  addFamily = index => {
    switch (index) {
      case 0:
        return this.props.navigation.navigate('MainInformation', {
          singlePerson: false,
          detailed: false,
          projectTitle: this.props.projectTitle,
        });
      case 1:
        return this.props.navigation.navigate('MainInformation', {
          singlePerson: false,
          detailed: true,
          projectTitle: this.props.projectTitle,
        });
      case 2:
        return this.props.navigation.navigate('MainInformation', {
          singlePerson: true,
          detailed: false,
          projectTitle: this.props.projectTitle,
        });
    }
  };

  render() {
    const typeAddFamily = [
      {title: t('quick_add'), index: 0},
      {title: t('detailed'), index: 1},
      {title: t('single_person'), index: 2},
    ];
    return (
      <Provider>
        <Portal>
          <Modal
            visible={this.props.showModal}
            onDismiss={() => this.props.hideModal()}>
            <View style={styles.modal}>
              <Image source={images.family_green} style={styles.img_family} />
              <Text style={styles.text_newfamily}>New family</Text>
              <View style={styles.bloc_text}>
                {typeAddFamily.map((type, index) => {
                  return (
                    <TouchableHighlight
                      key={index}
                      style={[
                        styles.btn_newfamily,
                        Platform === 'ios'
                          ? {
                              shadowOffset: {
                                width: n(2),
                                height: n(2),
                              },
                              shadowColor: color.black,
                              shadowOpacity: 0.3,
                            }
                          : {elevation: 9},
                      ]}
                      onPress={() => {
                        this.addFamily(type.index);
                      }}>
                      <Text style={styles.text_choice}>{type.title}</Text>
                    </TouchableHighlight>
                  );
                })}
              </View>
            </View>
          </Modal>
        </Portal>
        <Button style={{marginTop: n(30)}} onPress={this.props.showModal}>
          Show
        </Button>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: 100,
    height: 100,
  },
  modal: {
    width: wp('74.6%'),
    height: hp('49.7%'),
    borderRadius: n(sizing.M),
    backgroundColor: colors.white,
    marginLeft: n(48),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  img_family: {
    marginTop: n(37),
    // marginBottom: n(sizing.S),
    width: n(40),
    height: n(42),
  },
  bloc_text: {
    // marginBottom: n(35),
    // height: 162,
  },
  text_newfamily: {
    fontSize: n(20),
    lineHeight: n(24),
    color: colors.blue_mainColorApp,
    fontFamily: fonts.robotoMedium,
  },
  btn_newfamily: {
    marginBottom: 30,
    backgroundColor: colors.green_btn_icon,
    borderRadius: n(4),
    width: wp('52.8%'),
    height: hp('6.1%'),
    justifyContent: 'center',
  },
  text_choice: {
    textAlign: 'center',
    fontSize: n(16),
    lineHeight: n(20),
    color: colors.white,
    fontFamily: fonts.robotoMedium,
  },
});
