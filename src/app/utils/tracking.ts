// Thin dataLayer helpers for GTM event tracking on the landing page.
// See swiftrooms_landing_page_tracking_fix — GTM/GA4/Google Ads attribution
// needs these events pushed at the right moments; GTM triggers/tags are
// configured against these exact event names in the GTM container.

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

function pushToDataLayer(event: Record<string, unknown>) {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(event);
}

export function trackLeadFormSubmit() {
  pushToDataLayer({
    event: 'lead_form_submit',
    lead_source: 'landing-page',
    lead_type: 'quote_request',
  });
}

export function trackThankYouPageView() {
  pushToDataLayer({
    event: 'thank_you_page_view',
    lead_source: 'landing-page',
  });
}

export function trackWhatsAppClick() {
  pushToDataLayer({
    event: 'whatsapp_click',
    whatsapp_number: '447466754555',
    lead_source: 'landing-page',
  });
}
