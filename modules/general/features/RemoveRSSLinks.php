<?php

namespace SpeedPress\Modules\General\Features;

/**
 * Class RemoveRSSLinks
 *
 * Removes the default WordPress RSS feed links from the HTML head.
 * Helps improve performance and reduce unnecessary HTTP requests
 * if RSS feeds are not required.
 *
 * @package SpeedPress\Modules\General\Features
 * @since 1.0.0
 */
class RemoveRSSLinks extends BaseFeature
{

    /**
     * Run the feature
     *
     * Removes RSS links from the WordPress head section
     * if the feature is enabled.
     *
     * @return void
     */
    public function run() {
        if ($this->value) {
            remove_action('wp_head', 'feed_links', 2);
            remove_action('wp_head', 'feed_links_extra', 3);
        }
    }
}