import ReactDOM from 'react-dom';
import React from 'react';
import Root from './index';
import { createMemoryHistory } from 'history';

const history = createMemoryHistory();

ReactDOM.render(<Root history={history} />, document.getElementById('app'));
