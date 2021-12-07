import React from 'react';
import cfg from 'teleport/config';
import { Route, Switch, useParams } from 'teleport/components/Router';
import LogoHero from 'teleport/components/LogoHero';
import CardWelcome from './CardWelcome';

export default function InviteWrapper({ passwordResetMode = false, children }) {
  const { tokenId } = useParams<{ tokenId: string }>();

  return (
    <>
      <LogoHero />
      <Switch>
        <Route
          path={[cfg.routes.userInviteContinue, cfg.routes.userResetContinue]}
        >
          {children}
        </Route>
        <Route path={[cfg.routes.userInvite, cfg.routes.userReset]}>
          <CardWelcome
            tokenId={tokenId}
            passwordResetMode={passwordResetMode}
          />
        </Route>
      </Switch>
    </>
  );
}
