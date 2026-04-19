<?php

namespace SpeedPress\Modules\Cache\Features;

use SpeedPress\Modules\BaseFeature;

/**
 * Class SitemapPreload
 *
 * Preload cache by crawling a sitemap URL.
 *
 * @package SpeedPress\Modules\Cache\Features
 * @since 1.0.0
 */
class SitemapPreload extends BaseFeature {

    public function run(): void {
        if (empty($this->value['enabled']) || empty($this->value['sitemap'])) return;

        add_action('init', function() {
            $sitemap_url = $this->value['sitemap'];
            // Fetch sitemap and preload all URLs
        });
    }
}