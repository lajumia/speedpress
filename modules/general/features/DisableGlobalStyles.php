<?php

namespace SpeedPress\Modules\General\Features;

class DisableGlobalStyles {

    protected $key;
    protected $value;

    public function __construct($key, $value){
        $this->key = $key;
        $this->value = $value;
    }

    public function run() {
        if ($this->value) {
            remove_action('wp_enqueue_scripts', 'wp_enqueue_global_styles');
        }
    }
}