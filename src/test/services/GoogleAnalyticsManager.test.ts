import GoogleAnalyticsManager from "../../services/GoogleAnalyticsManager";
import ReactGA from 'react-ga';

describe("GoogleAnalyticsManager", function () {
    const ENABLED = "true";
    let processEnv;

    beforeEach(function () {
        backupProcessEnv();
        resetMocks();
    });

    afterEach(function () {
        restoreProcessEnv();
    });

    describe("initialize", function () {
        it("should init if tracking is enabled and tracking id is provided", function () {
            // given
            overrideProcessEnv({trackingEnabled: ENABLED, trackingId: "someId"});
            const manager = new GoogleAnalyticsManager();

            // when
            manager.init();

            // then
            expect(manager.isInitialized()).toEqual(true);
            expect(ReactGA.initialize).toBeCalled();
        });

        it("should not init if tracking is disabled", function () {
            // given
            overrideProcessEnv({trackingEnabled: "false", trackingId: "someId"});
            const manager = new GoogleAnalyticsManager();

            // when
            manager.init();

            // then
            expect(manager.isInitialized()).toEqual(false);
            expect(ReactGA.initialize).not.toBeCalled();
        });

        it("should not init if tracking id is not provided", function () {
            // given
            overrideProcessEnv({trackingEnabled: ENABLED});
            const manager = new GoogleAnalyticsManager();

            // when
            manager.init();

            // then
            expect(manager.isInitialized()).toEqual(false);
            expect(ReactGA.initialize).not.toBeCalled();
        });
    });

    describe("pageview", function () {
        it("should fire pageview if initialized", function () {
            // given
            const manager = new GoogleAnalyticsManager();
            setIsInitialized(manager, true);

            const path = "path";

            // when
            manager.pageview(path);

            // then
            expect(ReactGA.pageview).toBeCalledWith(path);
        });

        it("should not fire pageview if not initialized", function () {
            // given
            const manager = new GoogleAnalyticsManager();
            setIsInitialized(manager, false);

            // when
            manager.pageview("anything");

            // then
            expect(ReactGA.pageview).not.toBeCalled();
        });
    });

    describe("event", function () {
        beforeEach(function () {
            ReactGA.event = jest.fn();
        });

        it("should fire event if initialized", function () {
            // given
            const manager = new GoogleAnalyticsManager();
            setIsInitialized(manager, true);

            const args = {
                category: 'Translation',
                action: 'From CSS'
            };

            // when
            manager.event(args);

            // then
            expect(ReactGA.event).toBeCalledWith(args);
        });

        it("should not fire event if not initialized", function () {
            // given
            const manager = new GoogleAnalyticsManager();
            setIsInitialized(manager, false);

            // when
            const args = {
                category: 'Translation',
                action: 'To CSS'
            };
            manager.event(args);

            // then
            expect(ReactGA.event).not.toBeCalled();
        });
    });

    function backupProcessEnv() {
        processEnv = {...process.env};
    }

    function restoreProcessEnv() {
        process.env = processEnv;
    }

    function resetMocks() {
        (ReactGA.initialize as any).mockReset();
        (ReactGA.pageview as any).mockReset();
    }

    function overrideProcessEnv({trackingEnabled, trackingId}: { trackingEnabled?: string; trackingId?: string }) {
        process.env.REACT_APP_GOOGLE_ANALYTICS_TRACKING_ENABLED = trackingEnabled;
        process.env.REACT_APP_GOOGLE_ANALYTICS_TRACKING_ID = trackingId;
    }

    function setIsInitialized(manager, isInitialized) {
        manager.isInitialized = () => isInitialized;
    }
});