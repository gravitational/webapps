
import history from 'teleport/services/history';
import cfg from 'teleport/config';

export default function ssoLogin() {
    console.log("SSO login start")
    const authProviders = cfg.getAuthProviders();
    let provider = authProviders[0]
    const appStartRoute = getEntryRoute();
    console.log("Redirect URL after sso login:" + appStartRoute)
    const ssoUri = cfg.getSsoUrl(provider.url, provider.name, appStartRoute);
    console.log("SSO login url:" + ssoUri)
    history.push(ssoUri, true);
}

export function redirectToExternalIdentityProvider() {
    if ( cfg.baseUrl.endsWith('.idemeum.com') || cfg.baseUrl.endsWith('.idemeumlab.com')) {
        const loginUrl = cfg.baseUrl.replace('.remote.', '.')
        console.log("Redirecting to external identity provider:" + loginUrl)
        window.location.href = loginUrl;
    }
    else {
        window.location.href = cfg.baseUrl;
    }
}

function getEntryRoute() {
    var redirectUrl = new URL(decodeURIComponent(window.location.href))
    const knownRoute = history.ensureKnownRoute(redirectUrl.pathname);
    const knownRedirect = history.ensureBaseUrl(knownRoute);
    const query = redirectUrl.search ? redirectUrl.search : '';
    return knownRedirect + query
}