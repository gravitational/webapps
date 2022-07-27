
import history from 'teleport/services/history';
import cfg from 'teleport/config';

export default function ssoLogin() {
    console.log("Onlogin with sso rendered")
    const authProviders = cfg.getAuthProviders();
    let provider = authProviders[0]
    const appStartRoute = getEntryRoute();
    const ssoUri = cfg.getSsoUrl(provider.url, provider.name, appStartRoute);
    console.log("Onlogin with sso rendered url: " + ssoUri)
    history.push(ssoUri, true);
}

function getEntryRoute() {
    let entryUrl = history.getRedirectParam();
    if (entryUrl) {
      entryUrl = history.ensureKnownRoute(entryUrl);
    } else {
      entryUrl = cfg.routes.root;
    }
    return history.ensureBaseUrl(entryUrl);
  }