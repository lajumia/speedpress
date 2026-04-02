<?php

namespace SpeedPress\Core;

use SpeedPress\Core\Loader;

/**
 * Class Bootstrap
 *
 * Main plugin bootstrap class responsible for initializing
 * the entire plugin lifecycle.
 *
 * Responsibilities:
 * - Define core constants
 * - Load dependencies
 * - Register global hooks
 * - Register admin assets
 * - Initialize and run modules
 *
 * @package SpeedPress\Core
 * @since   1.0.0
 */
class Bootstrap {

    /**
     * Plugin main file path.
     *
     * @var string
     * @since 1.0.0
     */
    protected $plugin_file;

    /**
     * Constructor
     *
     * @param string $plugin_file Full path to main plugin file.
     *
     * @since 1.0.0
     */
    public function __construct( $plugin_file ) {
        $this->plugin_file = $plugin_file;
    }

    /**
     * Run the plugin
     *
     * This method initializes all required components
     * of the plugin in correct order.
     *
     * @return void
     * @since 1.0.0
     */
    public function run() {
        $this->define_constants();
        $this->load_dependencies();
        $this->register_hooks();
        $this->register_admin_assets();
        $this->run_modules();
    }

    /**
     * Safely define a constant if not already defined.
     *
     * @param string $name  Constant name
     * @param mixed  $value Constant value
     */
    private function safe_define( $name, $value ) {
        if ( ! defined( $name ) ) {
            define( $name, $value );
        }
    }

    /**
     * Define plugin constants
     *
     * These constants are used globally across the plugin.
     *
     * @return void
     * @since 1.0.0
     */
    private function define_constants() {

        $this->safe_define( 'SPEEDPRESS_FILE', $this->plugin_file ); // Example: /var/www/html/wp-content/plugins/speedpress/speedpress.php
        $this->safe_define( 'SPEEDPRESS_DIR', plugin_dir_path( $this->plugin_file ) ); // Example: /var/www/html/wp-content/plugins/speedpress/
        $this->safe_define( 'SPEEDPRESS_URL', plugin_dir_url( $this->plugin_file ) ); // Example: https://example.com/wp-content/plugins/speedpress/
        $this->safe_define( 'SPEEDPRESS_VERSION', '1.0.0' );
        $this->safe_define( 'SPEEDPRESS_CACHE_DIR', WP_CONTENT_DIR . '/cache/speedpress/' ); // Example: /var/www/html/wp-content/cache/speedpress/
        $this->safe_define( 'SPEEDPRESS_CACHE_HTML_DIR', SPEEDPRESS_CACHE_DIR . 'html/'); // Example: /var/www/html/wp-content/cache/speedpress/html/
        $this->safe_define( 'SPEEDPRESS_CACHE_JS_DIR', SPEEDPRESS_CACHE_DIR . 'js/' ); // Example: /var/www/html/wp-content/cache/speedpress/js/
        $this->safe_define( 'SPEEDPRESS_CACHE_CSS_DIR', SPEEDPRESS_CACHE_DIR . 'css/' ); // Example: /var/www/html/wp-content/cache/speedpress/css/
        $this->safe_define( 'SPEEDPRESS_LOG_DIR', SPEEDPRESS_CACHE_DIR . 'logs/' ); // Example: /var/www/html/wp-content/cache/speedpress/logs/
        $this->safe_define( 'SPEEDPRESS_ASSETS_DIR', SPEEDPRESS_DIR . 'assets/' ); // Example: /var/www/html/wp-content/plugins/speedpress/src/assets/
        $this->safe_define( 'SPEEDPRESS_ASSETS_URL', SPEEDPRESS_URL . 'assets/' ); // Example: https://example.com/wp-content/plugins/speedpress/src/assets/

    }

    /**
     * Load additional dependencies
     *
     * This is optional and used when Composer or
     * manual includes are required.
     *
     * @return void
     * @since 1.0.0
     */
    private function load_dependencies() {
        // Example:
        // require_once SPEEDPRESS_PATH . 'src/helpers/helpers.php';
    }

    /**
     * Register global WordPress hooks
     *
     * Handles plugin lifecycle hooks such as activation
     * and deactivation.
     *
     * @return void
     * @since 1.0.0
     */
    private function register_hooks() {

        register_activation_hook(
            $this->plugin_file,
            [ $this, 'on_activate' ]
        );

        register_deactivation_hook(
            $this->plugin_file,
            [ $this, 'on_deactivate' ]
        );
    }

    /**
     * Register and enqueue admin assets
     *
     * Loads CSS and JS files only on plugin admin pages
     * to improve performance.
     *
     * @return void
     * @since 1.0.0
     */
    private function register_admin_assets() {

        add_action( 'admin_enqueue_scripts', function( $hook ) {

            /**
             * Only load assets on SpeedPress admin pages
             *
             * @var string $hook Current admin page hook suffix
             */
            if ( strpos( $hook, 'speedpress' ) === false ) {
                return;
            }

            wp_register_style(
                'speedpress-admin',
                SPEEDPRESS_URL . 'src/Admin/assets/admin.css',
                [],
                SPEEDPRESS_VERSION
            );

            wp_register_script(
                'speedpress-admin',
                SPEEDPRESS_URL . 'src/Admin/assets/admin.js',
                [ 'jquery' ],
                SPEEDPRESS_VERSION,
                true
            );

            wp_enqueue_style( 'speedpress-admin' );
            wp_enqueue_script( 'speedpress-admin' );
        });
    }

    /**
     * Initialize and run all modules
     *
     * Modules are feature-based components such as:
     * - CSS Optimization
     * - JS Optimization
     * - Cache System
     *
     * @return void
     * @since 1.0.0
     */
    private function run_modules() {

        $settings = get_option('speedpress_settings', []);

        // List of modules with their settings key
        $modules = [
            'css'   => \SpeedPress\Modules\CSS\CSSModule::class,
            'js'    => \SpeedPress\Modules\JS\JSModule::class,
            'cache' => \SpeedPress\Modules\Cache\CacheModule::class,
        ];

        // Loop through modules
        foreach ($modules as $key => $class) {
            if (!class_exists($class)) continue;

            // Pick only the settings group for this module
            $module_settings = $settings[$key] ?? [];

            $module = new $class($module_settings); // pass only relevant settings
            if (method_exists($module, 'run')) {
                $module->run();
            }
        }
    }

    /**
     * Plugin activation callback
     *
     * Runs when plugin is activated.
     *
     * @return void
     * @since 1.0.0
     */
    public function on_activate() {
        // List of required cache folders
        $folders = [
            SPEEDPRESS_CACHE_DIR,          // main cache folder
            SPEEDPRESS_CACHE_HTML_DIR,     // HTML cache
            SPEEDPRESS_CACHE_CSS_DIR,      // CSS cache
            SPEEDPRESS_CACHE_JS_DIR,       // JS cache
            SPEEDPRESS_LOG_DIR,            // logs
        ];

        foreach ($folders as $folder) {
            if (!file_exists($folder)) {
                wp_mkdir_p($folder); // create folder recursively
            }
        }

        // Optional: clear old cache if needed
        // $this->clear_cache(); // implement in CacheModule if you want
    }

    /**
     * Plugin deactivation callback
     *
     * Runs when plugin is deactivated.
     *
     * @return void
     * @since 1.0.0
     */
    public function on_deactivate() {
        // Example:
        // Clear cache or cleanup
    }
}