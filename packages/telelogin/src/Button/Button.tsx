import React from 'react';
import './button.css';
import logo from './assets';

export function LoginButton({ text, publicAddr }: ButtonProps) {
  function onClick(e) {
    e.preventDefault();
    window.open(publicAddr, '_blank').focus();
  }

  return (
    <button className="login-button" onClick={onClick}>
      <div className="login-div-image">
        <img className="login-image" src={logo} />
      </div>
      <div className="login-div-text">{text}</div>
    </button>
  );
}

export default LoginButton;

type ButtonProps = {
  text: string;
  publicAddr: string;
};
