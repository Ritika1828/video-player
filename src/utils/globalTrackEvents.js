


import * as amplitude from '@amplitude/analytics-browser';

// import amplitude from 'amplitude-js';

const checkNavigator = (cb) => (typeof navigator !== "undefined" ? cb : "");



const getDeviceType = () => {
    if (typeof navigator != "undefined") {
        const ua = navigator.userAgent;
        if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
            return "tablet";
        }
        if (
            /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
                ua
            )
        ) {
            return "mobile";
        }
        return "desktop";
    }
};

const globalTrackEvent =
    (eventName, type = "event", route = "") =>
        (props) => {
            // const { geoInfo } = parseCookies(),
            //     geoInfoCookies = JSON.parse(geoInfo || "{}");
            const finalProps = {
                event_source: "byjus_math_companion_frontend",
                utm_source: 'brainly',
                utm_medium: 'pop_up',
                // ua_os_version: checkNavigator(bowserDetails?.os?.version || null),
                // ua_browser_major_version: checkNavigator(bowserDetails?.browser?.version || null),
                // ua_os: checkNavigator(bowserDetails?.os?.name || null),
                // ua_device_type: checkNavigator(getDeviceType()),
                // ua_platform:
                //     checkNavigator(getDeviceType()) === "desktop" ? "web" : "mweb",
                // anonymous_id: getAnonymousId(),
                // session_id: sessionSave("amplitudeSessionId") ? sessionSave("amplitudeSessionId") : getAmplitudeSessionId(),
                // amplitude_device_id: getAnonymousId(),
                ...props,
            };

            switch (type) {
                case "event":
                    // trackEvent(eventName, finalProps);
                    amplitude.track(eventName, finalProps);
                    break;
                case "page":
                    // trackPageView(eventName, finalProps);
                    amplitude.track(eventName, finalProps);
                    break;
                case "error":
                    // trackError(eventName, finalProps);
                    amplitude.track(eventName, finalProps);
                    break;
                default:
                    break;
            }
            // if (route) Router.push(route);
        };
export default globalTrackEvent