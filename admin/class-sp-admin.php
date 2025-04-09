<?php

class SP_Admin {
    public function __construct() {
        add_action( 'admin_menu', array( $this, 'sp_admin_menu_register' ) );
        add_action('admin_enqueue_scripts', [$this, 'sp_admin_enqueue_scripts']);
    }

    /**\
     * Register the top-level menu and caching-related submenus.
     */
    public function sp_admin_menu_register() {
        $sp_icon_url = SP_DIR_URL . 'admin/assets/img/sp-logo.png';
        add_menu_page('SpeedPress','SpeedPress','manage_options','sp',array( $this, 'sp_render_page' ),$sp_icon_url,10);

        $submenus = [
            ['Dashboard',             'sp-dashboard'],
            ['File Optimization',     'sp-file-optimization'],
            ['Image Optimization',    'sp-image-optimization'],
            ['Database Optimization', 'sp-database-optimization'],
            

        ];

        // Loop through and add each submenu.
        foreach ($submenus as $submenu) {
            add_submenu_page('sp', $submenu[0], $submenu[0], 'manage_options', $submenu[1], [$this, 'sp_render_page']);

        }
        remove_submenu_page('sp', 'sp');

    }

    public function sp_render_page() {
            $current_page = $_GET['page'];
            // Dynamically render the appropriate root div based on the slug
            echo '<div id="' . esc_attr($current_page) . '-root"></div>';
    }

    // Print every admin page under specific page start
    public function sp_admin_enqueue_scripts($hook) {

        wp_enqueue_style('sp-global', SP_DIR_URL . 'admin/assets/css/speedpress.css', array(), $dash_dep['version']);

        if($hook == 'speedpress_page_sp-dashboard'){

            $dash_dep = require_once('views/dashboard.asset.php');
            wp_enqueue_script('sp-dashboard', SP_DIR_URL . 'admin/views/dashboard.js', $dash_dep['dependencies'], $dash_dep['version'], true);
            

        }elseif($hook == 'speedpress_page_sp-file-optimization'){
            
            $file_dep = require_once('views/file.asset.php');
            wp_enqueue_script('sp-file-optimization', SP_DIR_URL . 'admin/views/file.js', $file_dep['dependencies'], $file_dep['version'], true);
            wp_enqueue_style('sp-file-optimization', SP_DIR_URL . 'admin/assets/css/file.css', array(), $file_dep['version']);
            

        }elseif($hook == 'speedpress_page_sp-image-optimization'){

            $image_dep = require_once('views/image.asset.php');
            wp_enqueue_script('sp-image-optimization', SP_DIR_URL . 'admin/views/image.js', $image_dep['dependencies'], $image_dep['version'], true);
            

        }elseif($hook == 'speedpress_page_sp-database-optimization'){

            $database_dep = require_once('views/database.asset.php');
            wp_enqueue_script('sp-database-optimization', SP_DIR_URL . 'admin/views/database.js', $database_dep['dependencies'], $database_dep['version'], true);
            

        }else{
            return;
        }
        

        
    }



}
new SP_Admin();