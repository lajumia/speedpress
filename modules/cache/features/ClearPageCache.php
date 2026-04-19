<?php

namespace SpeedPress\Modules\Cache\Features;

use SpeedPress\Modules\BaseFeature;

/**
 * Class ClearPageCache
 *
 * Clears only the page cache.
 */
class ClearPageCache extends BaseFeature {

    public function run(): void {
        if (!$this->value) return;

        if (function_exists('speedpress_clear_page_cache')) {
            speedpress_clear_page_cache();
        }
    }
}