// Minimal client-side "routing" for the single dedicated sub-page this SPA
// needs (/thank-you). There's no router in this app — History API + a
// same-tab custom event (pushState doesn't fire popstate) is enough for one
// route, and keeps the lead form's in-memory state intact across the switch
// (a full navigation would lose it).

export const THANK_YOU_PATH = '/thank-you';
const ROUTE_CHANGE_EVENT = 'swiftrooms:routechange';
const LEAD_NAME_KEY = 'swiftrooms:lastLeadName';

export function isThankYouPath(): boolean {
  return window.location.pathname === THANK_YOU_PATH;
}

function navigate(path: string) {
  window.history.pushState({}, '', path);
  window.dispatchEvent(new Event(ROUTE_CHANGE_EVENT));
}

/** Called on successful lead submission. Persists the name (survives a
 * refresh on /thank-you) and switches the URL/view to the thank-you page. */
export function goToThankYou(name: string) {
  try {
    sessionStorage.setItem(LEAD_NAME_KEY, name);
  } catch {
    // Storage can be unavailable (private mode, etc.) — the page still
    // renders, just without the personalised name.
  }
  navigate(THANK_YOU_PATH);
}

export function goHome() {
  navigate('/');
}

export function getStoredLeadName(): string {
  try {
    return sessionStorage.getItem(LEAD_NAME_KEY) ?? '';
  } catch {
    return '';
  }
}

/** Re-renders on both pushState-driven navigation and the browser back/forward button. */
export function onRouteChange(handler: () => void): () => void {
  window.addEventListener(ROUTE_CHANGE_EVENT, handler);
  window.addEventListener('popstate', handler);
  return () => {
    window.removeEventListener(ROUTE_CHANGE_EVENT, handler);
    window.removeEventListener('popstate', handler);
  };
}
