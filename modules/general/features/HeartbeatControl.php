<?php

namespace SpeedPress\Modules\General\Features;

class HeartbeatControl {

    protected $key;
    protected $value;

    public function __construct($key, $value) {
        $this->key = $key;
        $this->value = $value;
    }

    public function run() {
        if (in_array($this->key, ['heartbeat_dashboard_interval','heartbeat_editor_interval','heartbeat_frontend_interval'])) {
            add_filter('heartbeat_settings', function($settings) {
                if ($this->key === 'heartbeat_dashboard_interval') {
                    $settings['interval'] = $this->value;
                }
                if ($this->key === 'heartbeat_editor_interval') {
                    $settings['interval'] = $this->value;
                }
                if ($this->key === 'heartbeat_frontend_interval') {
                    $settings['interval'] = $this->value;
                }
                return $settings;
            });
        }
    }
}