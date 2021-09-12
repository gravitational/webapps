import ReactDOM from 'react-dom';
import React from 'react';
import UI from './ui';
import { createMemoryHistory } from 'history';

const history = createMemoryHistory();

ReactDOM.render(<UI history={history} />, document.getElementById('app'));
