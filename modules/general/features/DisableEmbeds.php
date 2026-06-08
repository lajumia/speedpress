<?php

namespace SpeedPress\Modules\General\Features;

/**
 * Class DisableEmbeds
 *
 * Disables WordPress oEmbed functionality to reduce unnecessary
 * scripts, REST API endpoints, and frontend markup.
 *
 * Benefits:
 * - Removes oEmbed discovery links from <head>
 * - Removes oEmbed JavaScript
 * - Disables oEmbed REST API endpoint
 * - Disables automatic embed discovery
 * - Removes TinyMCE embed plugin
 * - Prevents loading wp-embed.min.js
 *
 * @package SpeedPress\Modules\General\Features
 * @since 1.0.0
 */
class DisableEmbeds extends BaseFeature
{
    /**
     * Register embed removal hooks.
     *
     * This method is called by the GeneralModule when the
     * disable_embeds setting is enabled.
     *
     * @return void
     */
    public function run(): void
    {
        if (!$this->value) {
            return;
        }

        add_action('init', [$this, 'disable_embeds']);
    }

    /**
     * Disable all WordPress embed functionality.
     *
     * Removes frontend scripts, discovery links,
     * REST API routes, and editor integrations.
     *
     * @return void
     */
    public function disable_embeds(): void
    {
        // Remove oEmbed REST API endpoint
        remove_action('rest_api_init', 'wp_oembed_register_route');

        // Remove oEmbed discovery links from <head>
        remove_action('wp_head', 'wp_oembed_add_discovery_links');

        // Remove oEmbed JavaScript from <head>
        remove_action('wp_head', 'wp_oembed_add_host_js');

        // Disable automatic oEmbed discovery
        add_filter('embed_oembed_discover', '__return_false');

        // Remove TinyMCE embed plugin
        add_filter('tiny_mce_plugins', function ($plugins) {

            if (is_array($plugins)) {
                return array_diff($plugins, ['wpembed']);
            }

            return [];
        });

        // Prevent wp-embed.min.js from loading
        wp_deregister_script('wp-embed');
    }
}