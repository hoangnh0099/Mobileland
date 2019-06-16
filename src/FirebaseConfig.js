import firebase from 'firebase/app';
import 'firebase/firestore';

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyC8kZBxWZZOZ50pdjMRyxNhAgr2lDQMq_E",
  authDomain: "mobileland-2c658.firebaseapp.com",
  databaseURL: "https://mobileland-2c658.firebaseio.com",
  projectId: "mobileland-2c658",
  storageBucket: "mobileland-2c658.appspot.com",
  messagingSenderId: "668739385045",
  appId: "1:668739385045:web:1cc193956d9b05f5"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;