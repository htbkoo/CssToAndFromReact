export default class GoogleAnalyticsManager {
    public pageview(path: string) {
        this.event('page_view', {
            page_location: path
        });
    }

    public event(eventName: string, eventParams: Record<string, string> = {}) {
        const trackDescription = `event '${eventName}'${eventParams ? `, with args: ${JSON.stringify(eventParams)}` : ''}`;
        if (this.isInitialized()) {
            console.log(trackDescription);
            window['gtag']('event', eventName, eventParams);
        } else {
            console.warn(`Not initialized - not going to send ${trackDescription}`);
        }
    }

    public isInitialized(): boolean {
        const isGoogleAnalyticsTrackingEnabled = isTrue(process.env.REACT_APP_GOOGLE_ANALYTICS_TRACKING_ENABLED);
        const gaMeasurementId = process.env.REACT_APP_GOOGLE_ANALYTICS_GA_MEASUREMENT_ID;
        const isGtagFunctionDefined = typeof window['gtag'] === "function";

        if (isGoogleAnalyticsTrackingEnabled && gaMeasurementId && isGtagFunctionDefined) {
            console.log("Google Analytics tracking enabled and gaMeasurementId is defined, Google Analytics tracking is available");
            return true;
        } else {
            console.log(`Google Analytics tracking not available, details: isGoogleAnalyticsTrackingEnabled=${isGoogleAnalyticsTrackingEnabled}, isGtagFunctionDefined=${isGtagFunctionDefined}}`);
            return false;
        }
    }
}

function isTrue(optionalString?: string): boolean {
    return (typeof optionalString !== "undefined") && ("true" === optionalString.toLowerCase());
}
