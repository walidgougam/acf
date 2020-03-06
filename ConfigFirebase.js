import firebase from 'firebase';

export default config = {
  apiKey: 'AIzaSyAQbwLwffaar3tj5vKjBecIW6ylRm5XoMA',
  authDomain: 'actioncontrefaim-de2a6.firebaseapp.com',
  databaseURL: 'https://actioncontrefaim-de2a6.firebaseio.com',
  projectId: 'actioncontrefaim-de2a6',
  storageBucket: 'actioncontrefaim-de2a6.appspot.com',
  messagingSenderId: '1014644044329',
};

firebase.initializeApp(config);

export const f = firebase;
export const database = firebase.database();
export const auth = firebase.auth();
export const storage = firebase.storage();


// auth.signInWithEmailAndPassword
//auth.createUserWithEmailAndPassword
//  auth.signOut()
// f.auth().onAuthStateChanged
// database.ref('/walid').push(this.state.data);


// database.ref('/walid').on('child_added', () => {});
// database.ref('users').on('child_added', val => {
//     let key = val.key; //pour avoir l'id
//     let value = val.val().name; //pour avoir la valeur de name
//     this.setState({
//       users: [...this.state.users, val.val().name],
//     });
//   });
// database.ref('/walid').on('child_removed', () => {});
// database.ref('/walid').on('child_changed, () => {})
// database.ref('/walid').on('child_moved', () => {})
// database.ref('users/' + this.state.username).set({name: this.state.password});



//push pour ajouter et set pour modifier un deja existant. 