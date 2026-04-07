<?php

namespace SpeedPress\Modules\General\Features;

/**
 * Class DisableEmbeds
 *
 * Disables WordPress embed functionality (oEmbed) to reduce unnecessary scripts and improve performance.
 * When enabled, it prevents WordPress from loading embed-related scripts and REST API endpoints.
 *
 * @package SpeedPress\Modules\General\Features
 * @since 1.0.0
 */
class DisableEmbeds extends BaseFeature
{

    /**
     * Run the feature
     *
     * If enabled, disables all WordPress embed-related functionality.
     *
     * @return void
     */
    public function run() {
        if (!$this->value) {
            return;
        }

        // Remove REST API endpoint for oEmbeds
        remove_action('rest_api_init', 'wp_oembed_register_route');

        // Remove oEmbed discovery links from the <head>
        remove_action('wp_head', 'wp_oembed_add_discovery_links');

        // Remove oEmbed-specific JavaScript
        remove_action('wp_head', 'wp_oembed_add_host_js');

        // Disable automatic embeds in content
        add_filter('embed_oembed_discover', '__return_false');

        // Disable TinyMCE embeds plugin
        add_filter('tiny_mce_plugins', function($plugins) {
            if (is_array($plugins)) {
                return array_diff($plugins, ['wpembed']);
            }
            return [];
        });
    }
}