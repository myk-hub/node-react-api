import React from 'react';
import { Link } from 'react-router-dom';

export default function Hedaer(props) {
  const { username } = props;
  return (
    <header>
      <h1>Bank API</h1>
      <div className="user-menu">
        <h2>Welcome { username }</h2>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/account/profile/mykhub">Profile</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
