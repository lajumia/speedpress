<?php

namespace SpeedPress\Modules\Cache\Features;

use SpeedPress\Modules\BaseFeature;

/**
 * Class EdgeCache
 *
 * Integrate with edge cache services like Cloudflare, Fastly, or Varnish.
 *
 * @package SpeedPress\Modules\Cache\Features
 * @since 1.0.0
 */
class EdgeCache extends BaseFeature {

    public function run(): void {
        if (!$this->value) return;

        // Example: send cache purge headers or API calls to CDN
    }
}