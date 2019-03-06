import app from 'firebase/app';
import 'firebase/auth';

const config = {

  }

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
    this.googleProvider = new app.auth.GoogleAuthProvider();
  }

  doCreateUserWithEmail = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmail = (email, password) =>
    this.auth.signInUserWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);
  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);

  doSignInWithGoogle = () =>
    this.auth.signInWithPopup(this.googleProvider);
}

export default Firebase;
