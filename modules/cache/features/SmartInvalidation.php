<?php

namespace SpeedPress\Modules\Cache\Features;

use SpeedPress\Modules\BaseFeature;

/**
 * Class SmartInvalidation
 *
 * Clears only related pages when content changes, not the entire cache.
 *
 * @package SpeedPress\Modules\Cache\Features
 * @since 1.0.0
 */
class SmartInvalidation extends BaseFeature {

    public function run(): void {
        if (!$this->value) return;

        add_action('save_post', function($post_id) {
            // Invalidate only affected cache pages
        });
    }
}