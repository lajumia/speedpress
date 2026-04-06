<?php

namespace SpeedPress\Modules\General\Features;

class DisableGutenberg {

    protected $key;
    protected $value;

    public function __construct($key, $value) {
        $this->key = $key;
        $this->value = $value;
    }

    public function run() {
        if ($this->value) {
            add_filter('use_block_editor_for_post', '__return_false', 10);
            add_filter('use_block_editor_for_post_type', '__return_false', 10);
        }
    }
}