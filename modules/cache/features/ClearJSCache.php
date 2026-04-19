<?php

namespace SpeedPress\Modules\Cache\Features;

use SpeedPress\Modules\BaseFeature;

/**
 * Class ClearJSCache
 *
 * Clears only the minified/combined JS cache.
 */
class ClearJSCache extends BaseFeature {

    public function run(): void {
        if (!$this->value) return;

        if (function_exists('speedpress_clear_js_cache')) {
            speedpress_clear_js_cache();
        }
    }
}