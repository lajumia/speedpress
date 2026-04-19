<?php

namespace SpeedPress\Modules\Cache\Features;

use SpeedPress\Modules\BaseFeature;

/**
 * Class ClearAllCache
 *
 * Clears all caches including page, CSS, JS, and object caches.
 *
 * @package SpeedPress\Modules\Cache\Features
 */
class ClearAllCache extends BaseFeature {

    public function run(): void {
        if (!$this->value) return;

        // Clear Page Cache
        if (function_exists('speedpress_clear_page_cache')) {
            speedpress_clear_page_cache();
        }

        // Clear CSS/JS cache
        if (function_exists('speedpress_clear_assets_cache')) {
            speedpress_clear_assets_cache();
        }

        // Clear Object Cache
        if (function_exists('wp_cache_flush')) {
            wp_cache_flush();
        }
    }
}