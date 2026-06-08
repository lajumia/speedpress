<?php

namespace SpeedPress\Modules\General\Features;

/**
 * Class RemoveRSSLinks
 *
 * Removes WordPress RSS feed links from the HTML head section.
 *
 * @package SpeedPress\Modules\General\Features
 * @since 1.0.0
 */
class RemoveRSSLinks extends BaseFeature
{
    /**
     * Register hooks.
     *
     * @return void
     */
    public function run(): void
    {
        if (!$this->value) {
            return;
        }

        add_action('init', [$this, 'remove_rss_links']);
    }

    /**
     * Remove RSS feed links from wp_head.
     *
     * @return void
     */
    public function remove_rss_links(): void
    {
        remove_action('wp_head', 'feed_links', 2);
        remove_action('wp_head', 'feed_links_extra', 3);
    }
}