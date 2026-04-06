<?php
/**
 * Plugin Name:       SpeedPress - Development in proccess
 * Plugin URI:        https://wpspeedpress.com
 * Description:       All-in-one WordPress performance plugin — caching, CSS/JS optimization, image optimization, CDN integration, database cleanup, and Core Web Vitals improvements.
 * Version:           1.0.0
 * Requires at least: 6.0
 * Requires PHP:      7.4
 * Author:            SpeedPress
 * Author URI:        https://speedpress.io
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       speedpress
 * Domain Path:       /languages
 */

defined('ABSPATH') || die("No script kiddies please!");

// ------------------------------------------------------------------------
// Load Composer Autoloader
// ------------------------------------------------------------------------
$autoload = plugin_dir_path(__FILE__) . 'vendor/autoload.php';

if (file_exists($autoload)) {
    require_once $autoload;
} else {
    // Fallback / Debug
    die('Error: Composer autoload.php not found. Please run `composer install`.');
}

// ------------------------------------------------------------------------
// Bootstrap the Plugin
// ------------------------------------------------------------------------
use SpeedPress\Core\Bootstrap;

/**
 * Initialize the plugin safely with debug fallback
 *
 * @return void
 */
function speedpress_init() {

    // Check if class exists before instantiating
    if (!class_exists(Bootstrap::class)) {
        die('Error: Class SpeedPress\Core\Bootstrap not found. Check autoload & namespace!');
    }

    $app = new Bootstrap(__FILE__);

    // Optional: Catch runtime errors during run
    try {
        $app->run();
    } catch (\Throwable $e) {
        // Display error for debugging
        die('Error running SpeedPress plugin: ' . $e->getMessage());
    }
}

// Run plugin
speedpress_init();