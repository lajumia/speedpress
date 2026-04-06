<?php

namespace SpeedPress\Modules\General\Features;

class DisableDashicons {

    protected $key;
    protected $value;

    public function __construct($key, $value){
        $this->key = $key;
        $this->value = $value;
    }

    public function run() {
        if ($this->value && !is_admin()) {
            wp_deregister_style('dashicons');
        }
    }
}