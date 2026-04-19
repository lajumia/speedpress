<?php

namespace SpeedPress\Modules\Cache\Features;

use SpeedPress\Modules\BaseFeature;

/**
 * Class MemcachedCache
 *
 * Enable Memcached object caching if supported.
 *
 * @package SpeedPress\Modules\Cache\Features
 * @since 1.0.0
 */
class MemcachedCache extends BaseFeature {

    public function run(): void {
        if (!$this->value) return;

        if (class_exists('Memcached')) {
            // Configure Memcached object cache
        }
    }
}