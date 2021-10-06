import ReactDOM from 'react-dom';
import React from 'react';
import Ui from './ui';
import { createMemoryHistory } from 'history';

const history = createMemoryHistory();

ReactDOM.render(<Ui history={history} />, document.getElementById('app'));
