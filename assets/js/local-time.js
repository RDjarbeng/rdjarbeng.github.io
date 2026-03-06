/**
 * local-time.js
 * Converts UTC/server-rendered dates to the visitor's local timezone.
 * 
 * Usage: Add a <time> element with:
 *   - A `datetime` attribute containing an ISO 8601 string
 *   - A `data-local` attribute set to "time" (date+time) or "date" (date only)
 * 
 * Example:
 *   <time datetime="2026-03-05T15:00:00+02:00" data-local="time">March 5, 2026 at 3:00 PM CAT</time>
 * 
 * The element's text will be replaced with the date/time formatted in the visitor's timezone.
 */
(function () {
    'use strict';

    /**
     * Format a Date object as a human-friendly local date+time string.
     * e.g. "March 5, 2026 at 3:00 PM"
     */
    function formatLocalDateTime(date) {
        var options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        };
        // Intl.DateTimeFormat gives us locale-aware formatting
        var formatted = date.toLocaleString(undefined, options);
        return formatted;
    }

    /**
     * Format a Date object as a human-friendly local date-only string.
     * e.g. "March 5, 2026"
     */
    function formatLocalDate(date) {
        var options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        return date.toLocaleDateString(undefined, options);
    }

    /**
     * Convert all <time data-local> elements to the visitor's local timezone.
     */
    function convertDates() {
        var elements = document.querySelectorAll('time[data-local]');

        elements.forEach(function (el) {
            var datetime = el.getAttribute('datetime');
            if (!datetime) return;

            var date = new Date(datetime);
            // Guard against invalid dates
            if (isNaN(date.getTime())) return;

            var mode = el.getAttribute('data-local');

            if (mode === 'date') {
                el.textContent = formatLocalDate(date);
            } else {
                // "time" or any other value -> show full date+time
                el.textContent = formatLocalDateTime(date);
            }

            // Add a tooltip showing the full localized date+time with timezone
            el.title = date.toLocaleString(undefined, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
                hour12: true,
                timeZoneName: 'short'
            });
        });
    }

    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', convertDates);
    } else {
        convertDates();
    }
})();
