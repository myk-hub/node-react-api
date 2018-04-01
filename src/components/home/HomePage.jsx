import React from 'react';
import { Button } from 'reactstrap';

import Sidebar from '../shared/Sidebar';

export default function HomePage(props) {
  const { decrementFunction, incrementFunction } = props;
  return (
    <section className="page-content">
      <div className="row">
        <div className="col-sm-12 col-md-8">
          <Button onClick={incrementFunction}>Increment</Button>
          <Button onClick={decrementFunction}>Decrement</Button>
        </div>
        <Sidebar />
      </div>
    </section>
  );
}
