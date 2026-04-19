<?php

namespace SpeedPress\Modules\Cache\Features;

use SpeedPress\Modules\BaseFeature;

/**
 * Class ClearCSSCache
 *
 * Clears only the minified/combined CSS cache.
 */
class ClearCSSCache extends BaseFeature {

    public function run(): void {
        if (!$this->value) return;

        if (function_exists('speedpress_clear_css_cache')) {
            speedpress_clear_css_cache();
        }
    }
}