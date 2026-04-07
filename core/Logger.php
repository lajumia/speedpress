<?php

namespace SpeedPress\Core;

defined('ABSPATH') || exit;

/**
 * Class Logger
 *
 * Simple logging utility for SpeedPress plugin.
 *
 * Responsible for:
 * - Writing debug logs to file
 * - Formatting log messages with timestamp & context
 * - Handling debug mode checks
 *
 * Logs are stored in:
 * /wp-content/cache/speedpress/logs/debug.log
 *
 * Usage:
 * Logger::log('Message');
 * Logger::log('Message', 'context');
 *
 * @package SpeedPress\Core
 * @since   1.0.0
 */
class Logger {

    /**
     * Write a log message
     *
     * Logs a message only when SPEEDPRESS_DEBUG is enabled.
     * Automatically formats arrays/objects and adds timestamp + context.
     *
     * @param mixed  $message The message to log (string, array, object)
     * @param string $context Optional context (e.g., 'module', 'admin', 'error')
     *
     * @return void
     *
     * @since 1.0.0
     */
    public static function log($message, $context = 'general') {

        // Stop if debug mode is disabled
        if (!defined('SPEEDPRESS_DEBUG') || !SPEEDPRESS_DEBUG) {
            return;
        }

        // Convert arrays/objects to readable string
        if (is_array($message) || is_object($message)) {
            $message = print_r($message, true);
        }

        // Format log entry
        $log = '[' . date('Y-m-d H:i:s') . "] [$context] $message" . PHP_EOL;

        // Ensure log directory exists
        if (!file_exists(SPEEDPRESS_LOG_DIR)) {
            wp_mkdir_p(SPEEDPRESS_LOG_DIR);
        }

        // Write to log file
        file_put_contents(
            SPEEDPRESS_LOG_DIR . 'debug.log',
            $log,
            FILE_APPEND
        );
    }
}