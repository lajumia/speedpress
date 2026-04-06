<?php

namespace SpeedPress\Modules\General\Features;

class RemoveQueryStrings {

    protected $key;
    protected $value;

    public function __construct($key, $value){
        $this->key = $key;
        $this->value = $value;
    }

    public function run() {
        if ($this->value) {
            add_filter('script_loader_src', [$this, 'remove_version'], 15, 1);
            add_filter('style_loader_src', [$this, 'remove_version'], 15, 1);
        }
    }

    public function remove_version($src){
        if (strpos($src, '?ver=') !== false) {
            $src = remove_query_arg('ver', $src);
        }
        return $src;
    }
}