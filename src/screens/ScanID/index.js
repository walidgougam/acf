import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
  View,
  Image,
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import image from '../../../assets/image';
import colors from '../../constants/colors/colors';
import textDesign from '../../constants/typography/textDesign';
import {database} from '../../../ConfigFirebase';

export default class ScanScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      healthArea: '',
      projectTitle: '',
    };
  }

  static navigationOptions = {
    header: null,
  };

  componentDidMount() {
    // this.props.navigation.navigate('ScanResult', {
    //   qrCodeID:"e22b9093-c24b-4615-9e09-38cf8f26b919",
    // });
  }

  onSuccess = e => {
    this.props.navigation.navigate('ScanResult', {
      qrCodeID: e.data,
    });
  };

  render() {
    return (
      <QRCodeScanner
        onRead={this.onSuccess}
        flashMode={QRCodeScanner?.Constants?.FlashMode?.torch}
        showMarke={true}
        topContent={
          <View style={styles.topContent}>
            <View
              style={{
                zIndex: 100,
                flexDirection: 'row',
                backgroundColor: colors.blue_mainColorApp,
                height: 100,
                paddingHorizontal: 16,
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('Home');
                }}>
                <Image source={image.arrow_goback} style={styles.img_goback} />
              </TouchableOpacity>
              <Text style={styles.text_scan}>Scan ID card</Text>
            </View>
          </View>
        }
        cameraStyle={{
          height: 700,
          marginTop: 100,
        }}
        // bottomContent={}
      />
    );
  }
}

const styles = StyleSheet.create({
  topContent: {
    width: '100%',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  img_goback: {
    width: 38,
    height: 38,
  },
  text_scan: {
    ...textDesign.textScan,
    marginLeft: 8,
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
});
