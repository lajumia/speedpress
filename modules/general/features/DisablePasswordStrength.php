<?php

namespace SpeedPress\Modules\General\Features;

class DisablePasswordStrength {

    protected $key;
    protected $value;

    public function __construct($key, $value){
        $this->key = $key;
        $this->value = $value;
    }

    public function run() {
        if ($this->value) {
            wp_dequeue_script('password-strength-meter');
        }
    }
}