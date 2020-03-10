import React, {Component} from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import image from '../../../assets/image.js';
import colors from '../../constants/colors/colors';
import fonts from '../../constants/typography/fonts.js';

export default class TermsOfService extends Component {
  static navigationOptions = {
    header: null,
  };
  render() {
    return (
      <View style={{marginHorizontal: 17}}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => this.props.navigation.goBack()}
            style={{width: '40%', marginTop: 26}}
            hitSlop={{top: 20, bottom: 20, left: 50, right: 50}}>
            <Image source={image.arrow_left} style={styles.arrow} />
          </TouchableOpacity>
          <View style={{width: '50%', marginTop: 15}}>
            <Image source={image.logo_color} style={styles.logo} />
          </View>
        </View>
        <View>
          <Text style={styles.title_terms}>{t('terms_service')}</Text>
          <ScrollView>
            <Text style={styles.text}>
              Les données personnelles que vous avez communiquées à Action
              Contre la Faim par l’intermédiaire du site internet
              www.actioncontrelafaim.org/ sont, sauf demande contraire de votre
              part, traitées et conservées par notre association Conformément à
              la
              {'\n'}
              {'\n'}
              réglementation française et européenne en vigueur, vous pouvez
              vous opposer à l’utilisation de vos données ou y accéder pour leur
              rectification, limitation ou effacement en adressant une demande
              écrite, accompagnée d’un titre d’identité, à : Action contre la
              Faim – A l’attention du DPO – 14/16 boulevard de Douaumont – 75017
              PARIS ou dpo@actioncontrelafaim.org Pour toute précision sur la
              politique
              {'\n'}
              {'\n'}
              de protection des données personnelles d’Action contre la Faim,
              cliquez ici ou rendez-vous sur la page Données personnelles.
              1.1.Le Site et chacun des éléments qui le compose, et notamment
              les textes, articles, lettres d’information, brochures, plans,
              nuage de mots-clés, images, illustrations, photographies, bases de
              données, logiciels, marques, logos, fichiers disponibles en
            </Text>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 14,
  },
  arrow: {
    width: 16,
    height: 16,
  },
  logo: {
    width: 27,
    height: 53,
  },
  title_terms: {
    color: colors.blue_mainColorApp,
    fontFamily: fonts.robotoBold,
    fontSize: 32,
    lineHeight: 38,
    textAlign: 'center',
    marginBottom: 26,
  },
  text: {
    lineHeight: 20,
    fontSize: 16,
    fontFamily: fonts.robotoRegular,
    color: colors.grey_terms,
  },
});
