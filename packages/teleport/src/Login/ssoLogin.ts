
import history from 'teleport/services/history';
import cfg from 'teleport/config';

export default function ssoLogin() {
    console.log("sso login start")
    const authProviders = cfg.getAuthProviders();
    let provider = authProviders[0]
    const appStartRoute = getEntryRoute();
    const ssoUri = cfg.getSsoUrl(provider.url, provider.name, appStartRoute);
    console.log("sso login url:" + ssoUri)
    history.push(ssoUri, true);
}

function getEntryRoute() {
    const { search, pathname } = history.original().location;
    const knownRoute = history.ensureKnownRoute(pathname);
    const knownRedirect = history.ensureBaseUrl(knownRoute);
    const query = search ? search : '';
    return knownRedirect + query
}