<?php

class SP_Activator {
    public static function sp_activate() {

        $cache_dir = WP_CONTENT_DIR . '/cache/speedpress';
        if ( ! file_exists( $cache_dir ) ) {
            wp_mkdir_p( $cache_dir );
        }
        // Optional: add a blank index.html to prevent directory listing
        $index_file = trailingslashit( $cache_dir ) . 'index.html';
        if ( ! file_exists( $index_file ) ) {
            file_put_contents( $index_file, '' );
        }







    }//sp_activate function end
    
}