<?php

namespace SpeedPress\Modules\General\Features;

class DisableRSSFeeds {

    protected $key;
    protected $value;

    public function __construct($key, $value){
        $this->key = $key;
        $this->value = $value;
    }

    public function run() {
        if ($this->value) {
            add_action('do_feed', '__return_false', 1);
            add_action('do_feed_rdf', '__return_false', 1);
            add_action('do_feed_rss', '__return_false', 1);
            add_action('do_feed_rss2', '__return_false', 1);
            add_action('do_feed_atom', '__return_false', 1);
        }
    }
}