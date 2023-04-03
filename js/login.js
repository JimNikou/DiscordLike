const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCaKWbaN9tzEqMuPVngLp98EyRX6j3QI8M",
    authDomain: "spotreal-c23ee.firebaseapp.com",
    databaseURL: "https://spotreal-c23ee-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "spotreal-c23ee",
    storageBucket: "spotreal-c23ee.appspot.com",
    messagingSenderId: "1014040826469",
    appId: "1:1014040826469:web:5275c4560085852c1a2c8c"
  });
     const db = firebaseApp.firestore();
     const auth = firebaseApp.auth();
  
     const signUp = () => {
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const rememberMe = document.getElementById("remember-me").checked; // get checkbox value
      firebase.auth().setPersistence(rememberMe ? firebase.auth.Auth.Persistence.LOCAL : firebase.auth.Auth.Persistence.SESSION) // set persistence based on checkbox
        .then(() => {
          return firebase.auth().createUserWithEmailAndPassword(email, password);
        })
        .then((userCredential) => {
          // Signed in 
          window.location.href = "../index.html";
          // ...
        })
        .catch((error) => {
          console.log(error.code);
          console.log(error.message);
          // ...
        });
    };
    
    const signIn = () => {
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const rememberMe = document.getElementById("remember-me").checked; // get checkbox value
      firebase.auth().setPersistence(rememberMe ? firebase.auth.Auth.Persistence.LOCAL : firebase.auth.Auth.Persistence.SESSION) // set persistence based on checkbox
        .then(() => {
          return firebase.auth().signInWithEmailAndPassword(email, password);
        })
        .then((userCredential) => {
          // Signed in
          window.location.href = "../index.html";
          // ...
        })
        .catch((error) => {
          console.log(error.code);
          console.log(error.message);
        });
    };

    const logout = () => {
      firebase.auth().signOut().then(() => {
        // Sign-out successful.
        console.log("log out");
        window.location.href = "login.html";
      }).catch((error) => {
        // An error happened.
        console.log(error.code);
        console.log(error.message);
      });
    }
    
