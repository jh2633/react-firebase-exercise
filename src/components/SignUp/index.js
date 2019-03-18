import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const SignUp = () => (
  <div>
    <h1>Sign Up</h1>
    <SignUpForm />
  </div>
);

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  error: null,
};

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = {...INITIAL_STATE};
  }

  onSubmit = event => {
    const { username, email, passwordOne } = this.state;

    this.props.firebase
      .doCreateUserWithEmail(email, passwordOne)
      .then(authUser => {
        return this.props.firebase
          .user(authUser.user.uid)
          .set({
            username,
            email,
          })
      })
      .then(() => {
        this.setState({...INITIAL_STATE});
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error })
      });

      event.preventDefault();
  }

  onChange = event => {
    this.setState({[event.target.name]: event.target.value})
  };

  render() {
    const {
      username,
      email,
      passwordOne,
      error
    } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        <input
         name="username"
         value={username}
         onChange={this.onChange}
         type="text"
         placeholder="Full Name"
        />
        <input
         name="email"
         value={email}
         onChange={this.onChange}
         type="text"
         placeholder="Email Address"
        />
        <input
         name="passwordOne"
         value={passwordOne}
         onChange={this.onChange}
         type="password"
         placeholder="Password"
        />
        <button type="submit">Sign Up</button>

        {error && <p>{error.message}</p>}
      </form>
    )
  }
}

const SignUpForm = compose(
  withRouter,
  withFirebase,)(SignUpFormBase);

const SignUpLink = () => (
  <p>
    <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
)

export default SignUp;

export {SignUpForm, SignUpLink}
