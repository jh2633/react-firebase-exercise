import app from 'firebase/app';

const config = {

  }

class Firebase {
  constructor() {
    app.initializeApp(config);
  }
}

export default Firebase;
