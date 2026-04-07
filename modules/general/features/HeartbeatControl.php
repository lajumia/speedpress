<?php

namespace SpeedPress\Modules\General\Features;

/**
 * Class HeartbeatControl
 *
 * Controls WordPress Heartbeat intervals for Dashboard, Editor, and Frontend separately.
 *
 * Usage:
 *  - heartbeat_dashboard_interval => numeric seconds or 'disable' for admin dashboard
 *  - heartbeat_editor_interval    => numeric seconds or 'disable' for post editor
 *  - heartbeat_frontend_interval  => numeric seconds or 'disable' for frontend
 *
 * @package SpeedPress\Modules\General\Features
 * @since 1.0.0
 */
class HeartbeatControl extends BaseFeature 
{

    /**
     * Run the feature
     */
    public function run() {
        add_filter('heartbeat_settings', function($settings) {

            // Dashboard heartbeat
            if ($this->key === 'heartbeat_dashboard_interval' && is_admin() && !defined('DOING_AJAX')) {
                if ($this->value === 'disable') {
                    $settings['interval'] = 0;
                } elseif (is_numeric($this->value)) {
                    $settings['interval'] = (int) $this->value;
                }
            }

            // Editor heartbeat (admin post editor)
            if ($this->key === 'heartbeat_editor_interval' && is_admin() && function_exists('get_current_screen')) {
                $screen = get_current_screen();
                if ($screen && $screen->is_block_editor) {
                    if ($this->value === 'disable') {
                        $settings['interval'] = 0;
                    } elseif (is_numeric($this->value)) {
                        $settings['interval'] = (int) $this->value;
                    }
                }
            }

            // Frontend heartbeat
            if ($this->key === 'heartbeat_frontend_interval' && !is_admin()) {
                if ($this->value === 'disable') {
                    $settings['interval'] = 0;
                } elseif (is_numeric($this->value)) {
                    $settings['interval'] = (int) $this->value;
                }
            }

            return $settings;
        });
    }
}