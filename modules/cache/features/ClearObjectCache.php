<?php

namespace SpeedPress\Modules\Cache\Features;

use SpeedPress\Modules\BaseFeature;

/**
 * Class ClearObjectCache
 *
 * Clears object cache (Redis, Memcached, or default WP cache).
 */
class ClearObjectCache extends BaseFeature {

    public function run(): void {
        if (!$this->value) return;

        if (function_exists('wp_cache_flush')) {
            wp_cache_flush();
        }
    }
}