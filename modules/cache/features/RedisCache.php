<?php

namespace SpeedPress\Modules\Cache\Features;

use SpeedPress\Modules\BaseFeature;

/**
 * Class RedisCache
 *
 * Enable Redis object caching if supported by the server.
 *
 * @package SpeedPress\Modules\Cache\Features
 * @since 1.0.0
 */
class RedisCache extends BaseFeature {

    public function run(): void {
        if (!$this->value) return;

        if (extension_loaded('redis')) {
            // Enable Redis object cache
            if (!defined('WP_REDIS_DISABLED')) define('WP_REDIS_DISABLED', false);
        }
    }
}