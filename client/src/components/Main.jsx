import React from 'react';
import { Route, Switch } from 'react-router-dom';

import ApplicationHistoryPage from './Application_History/ApplicationHistoryPage';
import HomePage from './Homepage/HomePage';
import Login from './Login/Login';
import MilestonePage from './Milestone/MilestonePage';
import NegotiationPracticePage from './Negotiation_Practice/NegotiationPracticePage';
import SignUp from './Signup/Signup';
import TipsPage from './Tips/TipsPage';

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <main>
        <Switch>
          <Route
            exact
            path="/"
            render={props => <HomePage {...props} />}
          />
          <Route path="/milestones" component={MilestonePage} />
          <Route path="/tips" component={TipsPage} />
          <Route path="/applications" component={ApplicationHistoryPage} />
          <Route path="/practice" component={NegotiationPracticePage} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
        </Switch>
      </main>
    );
  }
}
