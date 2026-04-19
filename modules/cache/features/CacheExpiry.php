<?php

namespace SpeedPress\Modules\Cache\Features;

use SpeedPress\Modules\BaseFeature;

/**
 * Class CacheExpiry
 *
 * Controls how long pages remain cached before regeneration.
 *
 * @package SpeedPress\Modules\Cache\Features
 * @since 1.0.0
 */
class CacheExpiry extends BaseFeature {

    public function run(): void {
        if (!$this->value) return;

        // Set cache expiry duration
        define('SPEEDPRESS_CACHE_EXPIRY', (int)$this->value);
    }
}