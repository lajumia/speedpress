<?php

namespace SpeedPress\Core;

use SpeedPress\Admin\Admin;
use SpeedPress\Core\Logger;
use SpeedPress\Core\SettingsAPI;

defined('ABSPATH') || exit;

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
     * Admin UI class instance.
     *
     * @var Admin
     * @since 1.0.0
     */
    protected $admin;

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
     * Safely define a constant if not already defined.
     */
    private function safe_define( $name, $value ) {
        if ( ! defined( $name ) ) {
            define( $name, $value );
        }
    }

    /**
     * Define plugin constants
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

        // Debug mode
        $this->safe_define('SPEEDPRESS_DEBUG', defined('WP_DEBUG') && WP_DEBUG);
    }

    /**
     * Register global WordPress hooks
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
     * Plugin activation callback
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
                'disable_emojis' => true,
                'disable_imojis' => true,
                'disable_gutenberg' => true,
                'disable_xmlrpc' => true,
                'disable_jquery_migrate' => true,
                'disable_dashicons' => true,
                'disable_rss_feeds' => true,
                'remove_rss_links' => true,
                'disable_password_strength_meter' => true,
                'remove_query_strings' => true,
                'disable_block_library_css' => true,
                'disable_global_styles' => true,
                'disable_gutenberg_editor' => true,
                'disable_block_widgets' => true,
                'disable_svg_filters' => true,
                'heartbeat_dashboard_interval' => 15,
                'heartbeat_editor_interval' => 15,
                'heartbeat_frontend_interval' => 15,
            ],
            'cache' => [
                'page_cache' => true,
                'cache_expiry' => 86400,
                'mobile_cache' => false,
                'logged_in_cache' => false,
                'browser_caching' => true,
                'smart_invalidation' => true,
                'auto_purge' => true,
                'gzip' => true,
                'brotli' => false,
                'preload' => [
                    'enable' => false,
                    'on_publish' => true,
                    'sitemap' => '',
                    'scheduled' => false,
                ],
                'object_cache' => [
                    'enable' => false,
                    'redis' => false,
                    'memcached' => false,
                ],
                'edge_cache' => false,
                'exclusions' => [
                    'urls' => ['/cart','/checkout','/my-account','/wp-admin'],
                    'cookies' => ['woocommerce_cart_hash','woocommerce_items_in_cart'],
                    'user_agents' => [],
                ],
            ],
            'css' => [
                'minify' => true,
                'minify_exclusions' => ['style-handle'],
                'combine' => false,
                'combine_exclusions' => ['style-handle'],
                'async' => true,
                'async_exclusions' => ['style-handle'],
                'remove_unused' => false,
                'preload' => ['style-handle'],
            ],
            'js' => [
                'minify' => true,
                'minify_exclusions' => ['script-handle'],
                'combine' => false,
                'combine_exclusions' => ['script-handle'],
                'defer' => true,
                'defer_exclusions' => ['script-handle'],
                'delay' => false,
                'script_manager' => false,
                'preload' => ['script-handle'],
            ],
        ];

        // Only add defaults if option does not exist
        if (false === get_option('speedpress_settings')) {
            add_option('speedpress_settings', $defaults);
        }


    }

    /**
     * Plugin deactivation callback
     */
    public function on_deactivate() {
       Logger::log('Plugin deactivated', 'deactivation');
    }

    /**
     * Initialize admin
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
     * Initialize and run all modules
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
     * Initialize REST API routes
     *
     * @return void
     * @since 1.0.0
     */
    private function init_api() {
        add_action('rest_api_init', function() {
            register_rest_route('speedpress/v1', '/settings', [
                'methods'  => 'POST',
                'callback' => [SettingsAPI::class, 'update_settings'],
                'permission_callback' => function() {
                    return current_user_can('manage_options'); // Only admin can update
                },
                'args' => [
                    'settings' => [
                        'required' => true,
                        'type' => 'array',
                    ]
                ]
            ]);
        });
    }
}