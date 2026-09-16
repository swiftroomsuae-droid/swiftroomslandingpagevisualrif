window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
  'gtm.start': new Date().getTime(),
  event: 'gtm.js',
});

(function () {
  var firstScript = document.getElementsByTagName('script')[0];
  var gtmScript = document.createElement('script');
  gtmScript.async = true;
  gtmScript.src = 'https://www.googletagmanager.com/gtm.js?id=GTM-TD4BV3QB';
  firstScript.parentNode.insertBefore(gtmScript, firstScript);
})();
