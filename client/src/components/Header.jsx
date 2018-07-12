import React from 'react';
import { Link } from 'react-router-dom';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div className="ui top grey inverted nine item menu">
        <span className="item">
          <Link to="/">
             <img src="/images/logo.png" style={{width: 75, height: 75}}/>
          </Link>
        </span>
        <span className="item">
          <Link to="/">
            Home
          </Link>
        </span>
        <span className="item">
          <Link to="/milestones">
            Milestones
          </Link>
        </span>
        <span className="item">
          <Link to="/tips">
             Negotiation Tips
          </Link>
        </span>
        <span className="item">
          <Link to="/applications">
            Application History
          </Link>
        </span>
        <span className="item">
          <Link to="/practice">
            Negotiation Practice
          </Link>
        </span>
        <span className="item">
          <Link to="/search">
            Search
          </Link>
        </span>
        <span className="item">
          <Link to="/aboutUs">
            About us
          </Link>
        </span>
        <span className="item">
          <Link to="/login">
            Logout
          </Link>
        </span>
      </div>
    );
  }
}
