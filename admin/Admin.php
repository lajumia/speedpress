<?php

namespace SpeedPress\Admin;

defined('ABSPATH') or die("No script kiddies please!");

/**
 * Class Admin
 *
 * Class for registering and rendering the SpeedPress admin interface.
 * Handles WordPress admin menu integration and outputs the root element
 * for the frontend application (React/Vue/etc).
 *
 * @package SpeedPress\Admin
 */
class Admin {

    /**
     * Initialize admin hooks
     *
     * Registers WordPress hooks required for the admin panel.
     *
     * @return void
     */
    public function init() {
        add_action('admin_menu', [$this, 'register_admin_menu']);
        add_action('admin_enqueue_scripts', [$this, 'enqueue_admin_scripts']);
    }

    /**
     * Register admin menu page
     *
     * Adds the main SpeedPress menu item to the WordPress dashboard.
     *
     * @return void
     */
    public function register_admin_menu() {
        add_menu_page(
            'SpeedPress', // Page title
            'SpeedPress', // Menu title
            'manage_options', // Capability required
            'speedpress', // Menu slug
            [$this, 'render_page'], // Callback function
            'data:image/svg+xml;base64,' . base64_encode(
                '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.8"><path d="M13 2L3 14h9l-1 8 10-12h-9z"/></svg>'
            ), // Menu icon
            75 // Position
        );
    }

    /**
     * Render admin page
     *
     * Outputs the root container where the JavaScript app
     * (React/Vue) will be mounted.
     *
     * @return void
     */
    public function render_page() {
        echo '<div id="speedpress-admin-root"><h1>Speedpress</h1></div>';
    }

    /**
     * 
     */
    public function enqueue_admin_scripts() {
        //$asset_file = include(plugin_dir_path(__FILE__) . '../build/admin.asset.php');

        // wp_enqueue_script(
        //     'speedpress-admin',
        //     plugin_dir_url(__FILE__) . '../build/admin.js',
        //     $asset_file['dependencies'],
        //     $asset_file['version']
        // );
    }
}