import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import App from './App';
import Home from './containers/Home';

import store from './stores';

ReactDOM.render(
  <React.StrictMode>
    <Provider { ...store }>
      <App>
        <Home />
      </App>

    </Provider>
  </React.StrictMode >,
  document.getElementById('root')
);
