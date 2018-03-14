import React from 'react';
import { Button } from 'reactstrap';

import Sidebar from '../shared/Sidebar';

const showAlert = () => {
  alert('ClickClick');
};

export default function HomePage() {
  return (
    <section className="page-content">
      <div className="row">
        <div className="col-sm-12 col-md-8">
          <p>
            This is the home page.
          </p>
          <p>
            Here for your enjoyment is a button:
          </p>
          <Button onClick={showAlert}>Cleck Me</Button>
        </div>
        <Sidebar />
      </div>
    </section>
  );
}
