import ReactGA from 'react-ga';

export default class GoogleAnalyticsManager {
    private _isInitialized: boolean = false;

    public init() {
        const isGoogleAnalyticsTrackingEnabled = isTrue(process.env.REACT_APP_GOOGLE_ANALYTICS_TRACKING_ENABLED);
        const trackingId = process.env.REACT_APP_GOOGLE_ANALYTICS_TRACKING_ID;

        if (isGoogleAnalyticsTrackingEnabled && trackingId) {
            console.log("Google Analytics tracking enabled and trackingId is defined, initializing Google Analytics module now");
            ReactGA.initialize(trackingId);
            this._isInitialized = true;
        } else {
            if (!isGoogleAnalyticsTrackingEnabled) {
                console.log("Google Analytics tracking disabled and trackingId is defined, thus not initializing");
            } else {
                console.log("Google Analytics trackingId is not defined, thus not initializing");
            }
        }
    }

    public pageview(path: string) {
        if (this.isInitialized()) {
            console.log(`pageview at path: ${path}`);
            ReactGA.pageview(path);
        } else {
            console.warn(`Not initialized - not going to set pageview for path: "${path}"`);
        }
    }

    public isInitialized(): boolean {
        return this._isInitialized;
    }
}

function isTrue(optionalString?: string): boolean {
    return (typeof optionalString !== "undefined") && ("true" === optionalString.toLowerCase());
}