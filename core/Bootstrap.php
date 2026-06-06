<?php

namespace SpeedPress\Core;

use SpeedPress\Admin\Admin;
use SpeedPress\Core\Logger;
use SpeedPress\API\SettingsAPI;

defined('ABSPATH') || exit;

/**
 * Class Bootstrap
 *
 * Main entry point for the SpeedPress plugin lifecycle.
 *
 * This class is responsible for:
 * - Defining plugin constants
 * - Registering activation/deactivation hooks
 * - Initializing admin interface
 * - Loading and executing modules
 * - Registering REST API endpoints
 *
 * The bootstrap ensures all subsystems are initialized in a controlled order.
 *
 * @package SpeedPress\Core
 * @since   1.0.0
 */
class Bootstrap {

    /**
     * Full path to the main plugin file.
     *
     * Used for registering activation/deactivation hooks
     * and resolving plugin paths.
     *
     * @var string
     * @since 1.0.0
     */
    protected $plugin_path;

    /**
     * Admin module instance.
     *
     * Responsible for WordPress admin UI and settings pages.
     *
     * @var Admin
     * @since 1.0.0
     */
    protected $admin;

    /**
     * Constructor.
     *
     * @param string $plugin_path Full path to the main plugin file.
     *
     * @since 1.0.0
     */
    public function __construct( $plugin_path ) {
        $this->plugin_path = $plugin_path;
    }

   /**
     * Runs the plugin bootstrap process.
     *
     * Execution order:
     * 1. Define constants
     * 2. Register activation/deactivation hooks
     * 3. Initialize admin area
     * 4. Load modules
     * 5. Register REST API endpoints
     *
     * Any fatal errors are caught and logged safely.
     *
     * @return void
     * @since 1.0.0
     */
    public function run() {

        try {

            $this->define_constants();
            
            $this->register_hooks();  

            $this->init_admin();
            
            $this->run_modules();

            $this->init_api();
            

        } catch (\Throwable $e) {

            Logger::log($e->getMessage(), 'fatal');
            Logger::log($e->getTraceAsString(), 'trace');

            if (defined('SPEEDPRESS_DEBUG') && SPEEDPRESS_DEBUG) {
                wp_die('SpeedPress Error: ' . $e->getMessage());
            }
        }
    }

    /**
     * Safely defines a constant if not already defined.
     *
     * @param string $name  Constant name.
     * @param mixed  $value Constant value.
     *
     * @return void
     */
    private function safe_define( $name, $value ) {
        if ( ! defined( $name ) ) {
            define( $name, $value );
        }
    }

    /**
     * Defines all plugin constants used globally.
     *
     * Includes:
     * - Plugin paths
     * - Asset URLs
     * - Cache directories
     * - Debug mode flag
     *
     * @return void
     */
    private function define_constants() {

        $this->safe_define( 'SPEEDPRESS_FILE', $this->plugin_path ); // Example: /var/www/html/wp-content/plugins/speedpress/speedpress.php 
        $this->safe_define( 'SPEEDPRESS_DIR', plugin_dir_path( $this->plugin_path ) ); // Example: /var/www/html/wp-content/plugins/speedpress/ 
        $this->safe_define( 'SPEEDPRESS_URL', plugin_dir_url( $this->plugin_path ) ); // Example: https://example.com/wp-content/plugins/speedpress/ 
        $this->safe_define( 'SPEEDPRESS_VERSION', '1.0.0' ); 
        $this->safe_define( 'SPEEDPRESS_CACHE_DIR', WP_CONTENT_DIR . '/cache/speedpress/' ); // Example: /var/www/html/wp-content/cache/speedpress/ 
        $this->safe_define( 'SPEEDPRESS_CACHE_HTML_DIR', SPEEDPRESS_CACHE_DIR . 'html/'); // Example: /var/www/html/wp-content/cache/speedpress/html/ 
        $this->safe_define( 'SPEEDPRESS_CACHE_JS_DIR', SPEEDPRESS_CACHE_DIR . 'js/' ); // Example: /var/www/html/wp-content/cache/speedpress/js/ 
        $this->safe_define( 'SPEEDPRESS_CACHE_CSS_DIR', SPEEDPRESS_CACHE_DIR . 'css/' ); // Example: /var/www/html/wp-content/cache/speedpress/css/ 
        $this->safe_define( 'SPEEDPRESS_LOG_DIR', SPEEDPRESS_CACHE_DIR . 'logs/' ); // Example: /var/www/html/wp-content/cache/speedpress/logs/ 
        $this->safe_define( 'SPEEDPRESS_ASSETS_DIR', SPEEDPRESS_DIR . 'assets/' ); // Example: /var/www/html/wp-content/plugins/speedpress/assets/ 
        $this->safe_define( 'SPEEDPRESS_ASSETS_URL', SPEEDPRESS_URL . 'assets/' ); // Example: https://example.com/wp-content/plugins/speedpress/assets/

        // Debug mode
        $this->safe_define('SPEEDPRESS_DEBUG', defined('WP_DEBUG') && WP_DEBUG);
    }

    /**
     * Registers WordPress activation and deactivation hooks.
     *
     * @return void
     */
    private function register_hooks() {

        register_activation_hook(
            $this->plugin_path,
            [ $this, 'on_activate' ]
        );

        register_deactivation_hook(
            $this->plugin_path,
            [ $this, 'on_deactivate' ]
        );
    }

    /**
     * Runs on plugin activation.
     *
     * Responsibilities:
     * - Create required cache/log directories
     * - Initialize default plugin settings
     *
     * @return void
     */
    public function on_activate() {

        $folders = [
            SPEEDPRESS_CACHE_DIR,
            SPEEDPRESS_CACHE_HTML_DIR,
            SPEEDPRESS_CACHE_CSS_DIR,
            SPEEDPRESS_CACHE_JS_DIR,
            SPEEDPRESS_LOG_DIR,
        ];

        foreach ($folders as $folder) {
            if (!file_exists($folder)) {
                wp_mkdir_p($folder);
    
            }
        }

        // Default settings
        $defaults = [
            'general' => [
                'disable_emojis' => false,
                'disable_embeds' => false,
                'disable_jquery_migrate' => false,
                'disable_dashicons' => false,
                'disable_rss_feeds' => false,
                'remove_rss_links' => false,
                'disable_password_strength' => false,
                'remove_query_strings' => false,
                'disable_block_library_css' => false,
                'disable_global_styles' => false,
                'disable_gutenberg_editor' => false,
                'disable_block_widgets' => false,
                'disable_svg_filters' => false,
                'heartbeat_dashboard_interval' => 15,
                'heartbeat_editor_interval' => 15,
                'heartbeat_frontend_interval' => 15,
            ],
            // 'cache' => [
            //     'page_cache' => true,
            //     'cache_expiry' => 86400,
            //     'mobile_cache' => false,
            //     'logged_in_cache' => false,
            //     'browser_caching' => true,
            //     'smart_invalidation' => true,
            //     'auto_purge' => true,
            //     'gzip' => true,
            //     'brotli' => false,
            //     'preload' => [
            //         'enable' => false,
            //         'on_publish' => true,
            //         'sitemap' => '',
            //         'scheduled' => false,
            //     ],
            //     'object_cache' => [
            //         'enable' => false,
            //         'redis' => false,
            //         'memcached' => false,
            //     ],
            //     'edge_cache' => false,
            //     'exclusions' => [
            //         'urls' => ['/cart','/checkout','/my-account','/wp-admin'],
            //         'cookies' => ['woocommerce_cart_hash','woocommerce_items_in_cart'],
            //         'user_agents' => [],
            //     ],
            // ],
            // 'css' => [
            //     'minify' => true,
            //     'minify_exclusions' => ['style-handle'],
            //     'combine' => false,
            //     'combine_exclusions' => ['style-handle'],
            //     'async' => true,
            //     'async_exclusions' => ['style-handle'],
            //     'remove_unused' => false,
            //     'preload' => ['style-handle'],
            // ],
            // 'js' => [
            //     'minify' => true,
            //     'minify_exclusions' => ['script-handle'],
            //     'combine' => false,
            //     'combine_exclusions' => ['script-handle'],
            //     'defer' => true,
            //     'defer_exclusions' => ['script-handle'],
            //     'delay' => false,
            //     'script_manager' => false,
            //     'preload' => ['script-handle'],
            // ],
        ];

        // Only add defaults if option does not exist
        $existing = get_option('speedpress_settings');

        if (!$existing || !is_array($existing)) {
            add_option('speedpress_settings', $defaults);
        }


    }

    /**
     * Runs on plugin deactivation.
     *
     * @return void
     */
    public function on_deactivate() {
       Logger::log('Plugin deactivated', 'deactivation');
    }

    /**
     * Initializes admin module.
     *
     * @return void
     */
    private function init_admin() {

        try {
            $this->admin = new Admin();
            $this->admin->init();

        } catch (\Throwable $e) {
            Logger::log('Admin init error: ' . $e->getMessage(), 'admin');
        }
    }

    /**
     * Loads and runs all plugin modules.
     *
     * Each module receives its own settings subset.
     *
     * @return void
     */
    private function run_modules() {

        $settings = get_option('speedpress_settings', []);

        $modules = [
            'general' => \SpeedPress\Modules\General\GeneralModule::class,
            // 'cache'   => \SpeedPress\Modules\Cache\CacheModule::class,
            // 'css'     => \SpeedPress\Modules\CSS\CSSModule::class,
            // 'js'      => \SpeedPress\Modules\JS\JSModule::class,
        ];

        foreach ($modules as $key => $class) {

            $module_settings = $settings[$key] ?? [];

            try {
                $module = new $class($module_settings);
                $module->run();

            } catch (\Throwable $e) {
                Logger::log("Module error [$key]: " . $e->getMessage(), 'module');
            }
        }
    }

    /**
     * Registers REST API endpoints for plugin settings.
     *
     * Endpoints:
     * - GET  /speedpress/v1/settings
     * - POST /speedpress/v1/settings
     *
     * @return void
     */
    private function init_api() {
        add_action('rest_api_init', function() {
            
            register_rest_route('speedpress/v1', '/settings', [
                'methods'  => 'GET',
                'callback' => [SettingsAPI::class, 'get_settings'],
                'permission_callback' => function() {
                    return current_user_can('manage_options');
                },
            ]);
            
            register_rest_route('speedpress/v1', '/settings', [
                'methods'  => 'POST',
                'callback' => [SettingsAPI::class, 'update_settings'],
                'permission_callback' => function() {
                    return current_user_can('manage_options'); // Only admin can update
                },
                'args' => [
                    'settings' => [
                        'required' => true,
                        'type' => 'object',
                    ]
                ]
            ]);
        });

    }
}