import React, {
  Component
} from 'react';
import {
  createAppContainer,
  createSwitchNavigator
} from 'react-navigation';

import {
  createStackNavigator
} from 'react-navigation-stack';
import SplashScreen from './src/screens/SplashScreen/Splash';
import SignIn from './src/screens/Login/SignIn';
import ProjectScreen from './src/screens/Login/SelectProject';
import Home from './src/screens/Home/Home';
import ModalHome from './src/screens/Home/ModalHome';
import MainInformation from './src/screens/AddFamily/MainInformation';
import AddMembers from './src/screens/AddFamily/AddMembers';
import FoodActivity from './src/screens/AddFamily/FoodActivity';
import FoodActivity3 from './src/screens/HealthActivity/FoodActivity3';
import FamilyMembers from './src/screens/AddFamily/FamilyMembers';
import DataAcceptation from './src/screens/AddFamily/DataAcceptation';
import FamilyCard from './src/screens/AddFamily/FamilyCard';
import ListMembers from './src/screens/EditFamily/ListMembers';
import ListMembersFoodActivity from './src/screens/EditFamily/ListMembersFoodActivity';
import EditFamilyFoodActivity from './src/screens/EditFamily/EditFamilyFoodActivity';
import EditMainInformation from './src/screens/EditFamily/EditMainInformation';
import EditMembers from './src/screens/EditFamily/EditMembers';
import EditFamilyMembers from './src/screens/EditFamily/EditFamilyMembers';
import EditFoodActivity from './src/screens/EditFamily/EditFoodActivity';
import EditDataAcceptation from './src/screens/EditFamily/EditDataAcceptation';
import EditFamilyCard from './src/screens/EditFamily/EditFamilyCard';
import DeliverAndHistory from './src/screens/HealthActivity/DeliverAndHistory';
import DeliverAndHistorySearch from './src/screens/Supervisor/DeliverAndHistorySearch';
import AdvancedSearch from './src/screens/Supervisor/AdvancedSearch';
import SearchResult from './src/screens/Supervisor/SearchResult';
import ScannScreen from './src/screens/ScanID';
import ScanID from './src/screens/ScanID/index';
import FamilyView from './src/screens/HealthActivity/FamilyView';
import FamilyMembersFromQrCode from './src/screens/HealthActivity/FamilyMembersFromQrCode';
import SearchIdByNumber from './src/screens/ScanID/SearchByIdNumber';
import CardSearch from './src/components/atoms/card/CardSearch';
import TermsOfService from './src/screens/Home/TermsOfService';
import ScanResult from './src/screens/ScanID/ScanResult';

const Splash = createStackNavigator({
  Splash: {
    screen: SplashScreen,
    navigationOptions: {
      headerTitle: 'SplashScreen',
    },
  },
});
const AuthStack = createStackNavigator({
    SignIn: {
      screen: SignIn,
      // navigationOptions: {
      //   headerTitle: "Sign In"
      // }
    },
    ProjectScreen: {
      screen: ProjectScreen,
      navigationOptions: {
        headerTitle: 'Select Project',
      },
    },
  },

  //   ForgotPassword: {
  //     screen: Example,
  //     navigationOptions: {
  //       headerTitle: "Forgot Password"
  //     }
  //   },
  //   ResetPassword: {
  //     screen: Example,
  //     navigationOptions: {
  //       headerTitle: "Reset Password"
  //     }
  //   }
);

const NewFamilyStack = createStackNavigator({
  Splash: SplashScreen,
});

const HealthStack = createStackNavigator({
  FamilyView: {
    screen: FamilyView,
  },
  FamilyMembersFromQrCode: {
    screen: FamilyMembersFromQrCode,
  },
});

const HomeStack = createStackNavigator({
  Home: Home,
  modalHome: ModalHome,
  TermsOfService: TermsOfService,
  ScannScreen: ScannScreen,
  ScanID: ScanID,
  ScanResult: ScanResult,
  SearchIdByNumber: SearchIdByNumber,
  EditFamilyFoodActivity: EditFamilyFoodActivity,
  ListMembersFoodActivity: ListMembersFoodActivity,
});

const FamilyStack = createStackNavigator({
  MainInformation: MainInformation,
  AddMembers: AddMembers,
  FamilyMembers: FamilyMembers,
  FoodActivity: FoodActivity,
  DataAcceptation: DataAcceptation,
  FamilyCard: FamilyCard,
});

const FamilyStack2 = createStackNavigator({
  ListMembers: ListMembers,
  EditMainInformation: EditMainInformation,
  EditMembers: EditMembers,
  EditFamilyMembers: EditFamilyMembers,
  EditFoodActivity: EditFoodActivity,
  EditDataAcceptation: EditDataAcceptation,
  EditFamilyCard: EditFamilyCard,
});

const SupervisorStack = createStackNavigator({
  AdvancedSearch: AdvancedSearch,
  SearchResult: SearchResult,
  DeliverAndHistory: DeliverAndHistory,
  DeliverAndHistorySearch: DeliverAndHistorySearch,
  FoodActivity3: FoodActivity3,
});

const AppNavigation = createSwitchNavigator({
  NewFamilyStack: NewFamilyStack,
  Splash: Splash,
  Auth: AuthStack,
  Home: HomeStack,
  Family: FamilyStack,
  Family2: FamilyStack2,
  Supervisor: SupervisorStack,
  Health: HealthStack,
}, {
  initialRouteName: 'Home', // normalement on met splash ici, mais pour faire des essai je change
}, );

const AppContainer = createAppContainer(AppNavigation);

export default class App extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return <AppContainer / > ;
  }
}