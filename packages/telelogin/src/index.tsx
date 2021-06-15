import React from 'react';
import ReactDOM from 'react-dom';
import Button from './Button';
import Form from './Form';

export function renderLoginButton(element, props) {
  ReactDOM.render(<Button {...props} />, element);
}

export function renderLoginForm(element, props) {
  ReactDOM.render(<Form {...props} />, element);
}
