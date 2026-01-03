export const GA_MEASUREMENT_ID = 'G-GLYXD2SJN6';

export const trackEvent = (eventName, eventParams = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, eventParams);
  }
};

export const trackWhatsAppClick = (location) => {
  trackEvent('whatsapp_click', {
    event_category: 'engagement',
    event_label: location,
    value: 1,
  });
};

export const trackCTAClick = (buttonText, location) => {
  trackEvent('cta_click', {
    event_category: 'engagement',
    event_label: `${buttonText} - ${location}`,
    value: 1,
  });
};

export const trackSectionView = (sectionName) => {
  trackEvent('section_view', {
    event_category: 'engagement',
    event_label: sectionName,
  });
};

export const trackBrandInterest = (brandName) => {
  trackEvent('brand_interest', {
    event_category: 'engagement',
    event_label: brandName,
    value: 1,
  });
};

export const trackEmailClick = () => {
  trackEvent('email_click', {
    event_category: 'engagement',
    event_label: 'footer_email',
    value: 1,
  });
};

export const trackOrderIntent = () => {
  trackEvent('order_intent', {
    event_category: 'conversion',
    event_label: 'primary_cta',
    value: 1,
  });
};

export const trackAppDownload = (platform, location) => {
  trackEvent('app_download', {
    event_category: 'conversion',
    event_label: `${platform} - ${location}`,
    platform: platform,
    value: 1,
  });
};

export const trackAppStoreClick = (platform) => {
  trackEvent('app_store_click', {
    event_category: 'engagement',
    event_label: platform,
    platform: platform,
    value: 1,
  });
};
