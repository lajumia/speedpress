<?php
/**
 * Plugin Name:       SpeedPress--- Development In Proccess
 * Plugin URI:        https://wpspeedpress.com
 * Description:       All-in-one WordPress performance plugin — caching, CSS/JS optimization, image optimization, CDN integration, database cleanup, and Core Web Vitals improvements.
 * Version:           1.0.0
 * Requires at least: 6.0
 * Requires PHP:      7.4
 * Author:            Md Laju Miah
 * Author URI:        https://profiles.wordpress.org/devlaju/
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       speedpress
 * Domain Path:       /languages
 */

defined('ABSPATH') || exit;

// ------------------------------------------------------------------------
// Load Composer Autoloader
// ------------------------------------------------------------------------
$autoload = plugin_dir_path(__FILE__) . 'vendor/autoload.php';

if (!file_exists($autoload)) {
    add_action('admin_notices', function () {
        echo '<div class="notice notice-error"><p>';
        echo esc_html__('SpeedPress: Composer dependencies missing. Run "composer install".', 'speedpress');
        echo '</p></div>';
    });
    return;
}

require_once $autoload;

// ------------------------------------------------------------------------
// Import Bootstrap Class
// ------------------------------------------------------------------------
use SpeedPress\Core\Bootstrap;

// ------------------------------------------------------------------------
// Initialize Plugin
// ------------------------------------------------------------------------
function speedpress_init() {

    if (!class_exists(Bootstrap::class)) {
        if (defined('WP_DEBUG') && WP_DEBUG) {
            wp_die('SpeedPress Error: Bootstrap class not found.');
        }
        return;
    }

    try {
        $app = new Bootstrap(__FILE__);
        $app->run();
    } catch (\Throwable $e) {

        if (defined('WP_DEBUG') && WP_DEBUG) {
            wp_die('SpeedPress Error: ' . $e->getMessage());
        }

        // Log error silently in production
        if (function_exists('error_log')) {
            error_log('SpeedPress Error: ' . $e->getMessage());
        }
    }
}

speedpress_init();