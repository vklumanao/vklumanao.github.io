const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

let initialized = false;

const hasWindow = () => typeof window !== "undefined";

export function initAnalytics() {
  if (!hasWindow() || !GA_MEASUREMENT_ID || initialized) return;

  if (!window.dataLayer) {
    window.dataLayer = [];
  }

  window.gtag = window.gtag || function gtag() {
    window.dataLayer.push(arguments);
  };

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  window.gtag("js", new Date());
  window.gtag("config", GA_MEASUREMENT_ID, { send_page_view: true });

  initialized = true;
}

export function trackEvent(eventName, params = {}) {
  if (!eventName) return;

  if (hasWindow() && typeof window.gtag === "function" && GA_MEASUREMENT_ID) {
    window.gtag("event", eventName, params);
  }

  if (import.meta.env.DEV) {
    console.info("[analytics]", eventName, params);
  }
}

