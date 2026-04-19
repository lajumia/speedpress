<?php

namespace SpeedPress\Modules\Cache\Features;

use SpeedPress\Modules\BaseFeature;

/**
 * Class MobileCache
 *
 * Creates a separate cache copy for mobile visitors.
 *
 * @package SpeedPress\Modules\Cache\Features
 * @since 1.0.0
 */
class MobileCache extends BaseFeature {

    public function run(): void {
        if (!$this->value) return;

        add_filter('template_redirect', function() {
            if (wp_is_mobile()) {
                // Serve mobile-specific cached page
            }
        });
    }
}