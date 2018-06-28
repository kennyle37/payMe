import React from 'react';
import { Route, Switch } from 'react-router-dom';

import HomePage from './Homepage/homePage.jsx';
import MilestonePage from './Milestone/milestonePage.jsx';
import TipsPage from './Tips/tipsPage.jsx';
import ApplicationHistoryPage from './Application_History/ApplicationHistoryPage.jsx';
import Login from './Login/login.jsx';
import SignUp from './Signup/signup.jsx';
import NegotiationPracticePage from './Negotiation_Practice/negotiationPracticePage.jsx';


export default class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <main>
        <Switch>
          <Route exact path='/' render={(props) => {
            return <HomePage {...props} />
          }} />
          <Route path='/milestones' component={MilestonePage} />
          <Route path='/tips' component={TipsPage} />
          <Route path='/applications' component={ApplicationHistoryPage} />
          <Route path='/practice' component={NegotiationPracticePage} />
          <Route path='/login' component={Login} />
          <Route path='/signup' component={SignUp} />
        </Switch>
      </main>
    )
  }
};