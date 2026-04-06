<?php

namespace SpeedPress\Modules\General\Features;

class DisableXMLRPC {

    protected $key;
    protected $value;

    public function __construct($key, $value){
        $this->key = $key;
        $this->value = $value;
    }

    public function run() {
        if ($this->value) {
            add_filter('xmlrpc_enabled', '__return_false');
        }
    }
}