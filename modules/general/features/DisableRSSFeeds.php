<?php

namespace SpeedPress\Modules\General\Features;

/**
 * Class DisableRSSFeeds
 *
 * Disables all WordPress RSS feeds.
 *
 * @package SpeedPress\Modules\General\Features
 * @since 1.0.0
 */
class DisableRSSFeeds extends BaseFeature
{
    /**
     * Register feed disabling hooks.
     *
     * @return void
     */
    public function run(): void
    {
        if (!$this->value) {
            return;
        }

        add_action('do_feed', [$this, 'disable_feed'], 1);
        add_action('do_feed_rdf', [$this, 'disable_feed'], 1);
        add_action('do_feed_rss', [$this, 'disable_feed'], 1);
        add_action('do_feed_rss2', [$this, 'disable_feed'], 1);
        add_action('do_feed_atom', [$this, 'disable_feed'], 1);
    }

    /**
     * Disable RSS feeds.
     *
     * @return void
     */
    public function disable_feed(): void
    {
        wp_die(
            esc_html__('RSS feeds have been disabled.', 'speedpress'),
            '',
            ['response' => 403]
        );
    }
}