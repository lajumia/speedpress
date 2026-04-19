<?php

namespace SpeedPress\Modules\Cache\Features;

use SpeedPress\Modules\BaseFeature;

/**
 * Class LoggedInCache
 *
 * Cache pages for authenticated users.
 *
 * @package SpeedPress\Modules\Cache\Features
 * @since 1.0.0
 */
class LoggedInCache extends BaseFeature {

    public function run(): void {
        if (!$this->value) return;

        add_action('template_redirect', function() {
            if (is_user_logged_in()) {
                // Serve cached page for logged-in users
            }
        });
    }
}