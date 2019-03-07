import React from 'react';

import { withAuthorization } from '../Session'

const Home = () => (
  <div>
    <h1>Home page</h1>
    <p>Hello world</p>
  </div>
);

const condition = authUser => !!authUser

export default withAuthorization(condition)(Home);
