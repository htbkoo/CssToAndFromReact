// reference: https://www.emmanuelgautier.com/blog/typescript-extend-window
declare global {
    interface Window {
        gtag?: (...args: any[]) => void
        dataLayer?: Record<string, any>
    }
}
