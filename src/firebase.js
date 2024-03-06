import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyD9VPbCsWz8ux1PYyMjttpN8YOfjXsKwKI",
    authDomain: "ovpmern.firebaseapp.com",
    projectId: "ovpmern",
    storageBucket: "ovpmern.appspot.com",
    messagingSenderId: "261490331925",
    appId: "1:261490331925:web:aeddbdaa8dc9c2dc9d191c",
    measurementId: "G-PMEHX0W2VS"
  };

  firebase.initializeApp(firebaseConfig);
  const storage = firebase.storage();
  export default storage;