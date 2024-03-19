import posthog from 'posthog-js';
import * as config from './config';

const isBrowser = typeof window !== 'undefined';
const isDevelopment = process.env.NODE_ENV === 'development';

if (isBrowser && config.POSTHOG_KEY) {
	posthog.init(config.POSTHOG_KEY, {
		api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com',
		loaded: (posthog) => {
			if (isDevelopment) posthog.debug();
		},
	});
}

// Define the window interface for TypeScript
interface Window {
	gtag?: any;
	dataLayer?: any;
}

declare var window: Window;

const analytics = {
	/**
	 * Track events and send them to Google Analytics
	 * @param {String} event Event category
	 * @param {Object} options Data to send to Google Analytics
	 */
	track(event: string, properties?: object) {
		if (typeof window === 'undefined' || !event) {
			return;
		}

		if (typeof window.gtag !== 'undefined') {
			window.gtag('event', event, {
				event_category: 'engagement',
				event_label: 'web',
				value: {
					...properties,
				},
			});
		}

		if (typeof window.dataLayer !== 'undefined') {
			window.dataLayer.push({
				event: event,
				data: { ...properties },
			});
		}

		posthog.capture(event, properties);
	},

	/**
	 * Record a page view with Google Analytics
	 * @param {String} path URL path of the viewed page
	 */
	pageView(path: string) {
		if (typeof window === 'undefined') {
			return;
		}

		if (typeof window.dataLayer !== 'undefined') {
			window.dataLayer.push({
				event: 'page_view',
				page: path,
			});
		}

		if (typeof window.gtag !== 'undefined') {
			window.gtag('config', config.GA_TRACKING_ID, {
				page_path: path,
			});
		}

		posthog?.capture('$pageview');
	},

	/**
	 * Report an error to Google Analytics
	 * @param {Object} err Error object with a message
	 * @param {Boolean} fatal Flag to indicate if the error is fatal
	 */
	error(err: { message: string }, fatal: boolean = false) {
		if (!process.env.BROWSER) {
			return;
		}

		if (typeof window.gtag !== 'undefined') {
			window.gtag('event', 'exception', {
				description: err.message,
				fatal: fatal,
			});
		}
	},
};

export default analytics;
