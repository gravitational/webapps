import React, { useState, useEffect } from 'react';
import LoginButton from '../Button';

export function Form({ proxyAddr, appName }: FormProps) {
  let [config, setConfig] = useState<Config>({ auth: { providers: [] } });

  useEffect(() => {
    fetch(`https://${proxyAddr}/web/config.js`).then(response =>
      response.text().then(text => {
        setConfig(JSON.parse(text.substring(text.indexOf('=') + 1)));
      })
    );
  }, []);

  return (
    <>
      {config.auth.providers.map(provider => (
        <LoginButton
          text={formatText(provider)}
          publicAddr={formatAddr(provider, proxyAddr, appName)}
        />
      ))}
    </>
  );
}

const formatText = provider => `Login with Teleport (${provider.displayName})`;

function formatAddr(provider, proxyAddr, appName) {
  const redirect = `/web/launch/${appName}.${proxyAddr.split(':')[0]}`;
  const addr = `https://${proxyAddr}/web/sso?connector=${provider.name}&redirect=${redirect}`;
  return addr;
}

type FormProps = {
  proxyAddr: string;
  appName: string;
};

type Config = {
  auth: {
    providers: string[];
  };
};

export default Form;
