<?php

namespace SpeedPress\Modules\General\Features;

class DisableEmojis {

    protected $key;
    protected $value;

    public function __construct($key, $value) {
        $this->key = $key;
        $this->value = $value;
    }

    public function run() {
        if ($this->value) {
            remove_action('wp_head', 'print_emoji_detection_script', 7);
            remove_action('wp_print_styles', 'print_emoji_styles');
        }
    }
}