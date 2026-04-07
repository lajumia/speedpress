<?php

namespace SpeedPress\Modules\General\Features;

/**
 * Class DisableRSSFeeds
 *
 * Disables all default WordPress RSS feeds.
 * Useful for performance optimization and reducing server requests
 * if your site does not need RSS functionality.
 *
 * @package SpeedPress\Modules\General\Features
 * @since 1.0.0
 */
class DisableRSSFeeds {

    /**
     * The settings key for this feature.
     *
     * @var string
     */
    protected $key;

    /**
     * Whether this feature is enabled.
     *
     * @var bool
     */
    protected $value;

    /**
     * Constructor
     *
     * @param string $key   The feature key from plugin settings.
     * @param bool   $value Whether this feature is enabled.
     */
    public function __construct($key, $value){
        $this->key = $key;
        $this->value = $value;
    }

    /**
     * Run the feature
     *
     * Hooks into WordPress feed actions and disables them if the feature is enabled.
     *
     * @return void
     */
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