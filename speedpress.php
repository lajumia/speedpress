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

defined( 'ABSPATH' ) || exit;

/**
 * ------------------------------------------------------------------------
 * Load Composer Autoloader
 * ------------------------------------------------------------------------
 */
if ( file_exists( SPEEDPRESS_DIR . 'vendor/autoload.php' ) ) {
    require_once SPEEDPRESS_DIR . 'vendor/autoload.php';
}

/**
 * ------------------------------------------------------------------------
 * Bootstrap the Plugin
 * ------------------------------------------------------------------------
 */
use SpeedPress\Core\Bootstrap;

/**
 * Initialize the plugin
 *
 * Wrapped in function to avoid global scope pollution.
 *
 * @return void
 */
function speedpress_init() {

    $app = new Bootstrap( __FILE__ );
    $app->run();
}

// Run plugin
speedpress_init();