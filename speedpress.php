<?php
/**
 * Plugin Name: SpeedPress - Lightning-Fast WordPress Optimization
 * Plugin URI: https://github.com/lajumia/speedpress
 * Description: Supercharge your WordPress site with SpeedPress, the most advanced speed optimization plugin. Unlock faster load times, enhanced page performance, and higher search rankings. SpeedPress takes care of complex speed optimization tasks with simplicity, ensuring your site is fast, efficient, and ready to impress.
 * Version: 1.0.0
 * Author: Md Laju Miah
 * Author URI: https://www.upwork.com/freelancers/speedoptimizationspecialist
 * License: GPL-2.0-or-later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: speedpress
 * Domain Path: /languages
 */


 if ( ! defined( 'ABSPATH' ) ) exit;

class SpeedPress {

    public function __construct() {
        $this->define_constants();
        add_action('init', [$this, 'sp_load_require_files_for_admin']);
        register_activation_hook(__FILE__, [$this, 'sp_activate']);
        register_deactivation_hook(__FILE__, [$this, 'sp_deactivate']);
    }

    // Define constants
    private function define_constants() {
        define('SP_VERSION', '1.0.0');
        define('SP_DIR_PATH', plugin_dir_path(__FILE__));
        define('SP_DIR_URL', plugin_dir_url(__FILE__));
    }

    // Load required files for admin
    public function sp_load_require_files_for_admin() {
        require_once SP_DIR_PATH . 'admin/class-sp-admin.php';
    }


    // Activation hook callback
    public function sp_activate() {
        require_once SP_DIR_PATH . 'includes/class-sp-activator.php';
        SP_Activator::sp_activate();
    }

    // Deactivation hook callback
    public function sp_deactivate() {
        require_once SP_DIR_PATH . 'includes/class-sp-deactivator.php';
        SP_Deactivator::sp_deactivate();
    }
}

// Initialize the plugin
new SpeedPress();





























/**
 * Add 'defer' attribute to all enqueued scripts.
 *
 * @param string $tag The script tag for the enqueued script.
 * @param string $handle The script's registered handle.
 * @param string $src The script's source URL.
 * @return string The modified script tag with the defer attribute.
 */
function speedpress_add_defer_attribute($tag, $handle, $src) {
    // Skip scripts that should not have defer (e.g., admin scripts or specific handles).
    if (is_admin() || strpos($tag, 'jquery.js') !== false) {
        return $tag;
    }

    // Add the defer attribute.
    return str_replace('<script ', '<script defer ', $tag);
}
add_filter('script_loader_tag', 'speedpress_add_defer_attribute', 10, 3);
