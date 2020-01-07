import * as firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyC3-uCJkdDh3d8ATYsuSMwRmEBFpSf9yGM',
  authDomain: 'actioncontrefaim-6473b.firebaseapp.com',
  databaseURL: 'https://actioncontrefaim-6473b.firebaseio.com',
  projectId: 'actioncontrefaim-6473b',
  storageBucket: 'actioncontrefaim-6473b.appspot.com',
  messagingSenderId: '13106027680',
};

//firebase.initializeApp(config);

export default class Firebase {
  static auth;

  static init() {
    firebase.initializeApp(config);
    Firebase.auth = firebase.auth();
  }
}
