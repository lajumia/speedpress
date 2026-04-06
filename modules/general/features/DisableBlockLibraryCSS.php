<?php

namespace SpeedPress\Modules\General\Features;

class DisableBlockCSS {

    protected $key;
    protected $value;

    public function __construct($key, $value){
        $this->key = $key;
        $this->value = $value;
    }

    public function run() {
        if ($this->value) {
            add_filter('wp_enqueue_block_styles', '__return_false');
        }
    }
}