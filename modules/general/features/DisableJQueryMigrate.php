<?php

namespace SpeedPress\Modules\General\Features;

class DisableJQueryMigrate {

    protected $key;
    protected $value;

    public function __construct($key, $value){
        $this->key = $key;
        $this->value = $value;
    }

    public function run() {
        if ($this->value) {
            add_filter('wp_default_scripts', function($scripts) {
                if (!is_admin() && isset($scripts->registered['jquery'])) {
                    $scripts->registered['jquery']->deps = array_diff(
                        $scripts->registered['jquery']->deps,
                        ['jquery-migrate']
                    );
                }
            });
        }
    }
}