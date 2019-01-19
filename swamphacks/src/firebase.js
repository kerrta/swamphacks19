import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyD1BuKmJegRNzDTEMY2BvabPUwiBqYPn7U",
    authDomain: "swamphacks-ec7b4.firebaseapp.com",
    databaseURL: "https://swamphacks-ec7b4.firebaseio.com",
    projectId: "swamphacks-ec7b4",
    storageBucket: "swamphacks-ec7b4.appspot.com",
    messagingSenderId: "35379036026"
  };

  firebase.initializeApp(config);
  export default firebase;