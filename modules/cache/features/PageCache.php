<?php

namespace SpeedPress\Modules\Cache\Features;

use SpeedPress\Modules\BaseFeature;

/**
 * Class PageCache
 *
 * Serve static HTML pages to anonymous visitors for faster loading.
 *
 * @package SpeedPress\Modules\Cache\Features
 * @since 1.0.0
 */
class PageCache extends BaseFeature {

    public function run(): void {
        if (!$this->value) return;

        add_action('template_redirect', function() {
            if (!is_user_logged_in()) {
                // Serve cached HTML if available
            }
        });
    }
}