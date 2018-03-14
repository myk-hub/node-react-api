import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import 'bootstrap/dist/css/bootstrap.css';
import './css/bankapp.scss';

import Template from './components/Template';

const renderApp = (Component) => {
  render(
    <AppContainer>
      <Component headline="Test Headline" count={5463} showCount />
    </AppContainer>,
    document.querySelector('#react-app'),
  );
};

renderApp(Template);

if (module && module.hot) {
  module.hot.accept('./components/Template', () => {
    renderApp(Template);
  });
}
