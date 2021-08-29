import './index.scss';

import React from 'react';
import ReactDOM from 'react-dom';

import { App } from './App';
import { ErrorBoundary } from './components';

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById('root')
);
