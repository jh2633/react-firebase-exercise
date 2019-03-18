import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database'


class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
    this.db = app.database()
    this.googleProvider = new app.auth.GoogleAuthProvider();
  }
  // AUTH API
  doCreateUserWithEmail = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmail = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);
  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);

  doSignInWithGoogle = () =>
    this.auth.signInWithPopup(this.googleProvider);

  // USER API
  user = uid => this.db.ref(`users/${uid}`)
  userRole = uid => this.db.ref(`users/${uid}/appAccess/clusterApp/instances/master/`)
  users = uid => this.db.ref(`users`)

  roles = uid => this.db.ref(`roles`)
  instances = uid => this.db.ref(`apps/clusterApp/instances`)
}

export default Firebase;
