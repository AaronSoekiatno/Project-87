import * as firebase from "firebase"
require('@firebase/firestore')

var firebaseConfig = {
    apiKey: "AIzaSyCMQE8T_ScbZ_N7LpbpMGU44JOO9oY5TFY",
    authDomain: "project-77-7a125.firebaseapp.com",
    projectId: "project-77-7a125",
    storageBucket: "project-77-7a125.appspot.com",
    messagingSenderId: "552700333596",
    appId: "1:552700333596:web:65c1ec2a0e33d2cf5859d9",
    databaseURL:'https://project-77-7a125-default-rtdb.firebaseio.com/'
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  export default firebase.firestore();