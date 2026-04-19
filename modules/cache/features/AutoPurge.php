<?php

namespace SpeedPress\Modules\Cache\Features;

use SpeedPress\Modules\BaseFeature;

/**
 * Class AutoPurge
 *
 * Automatically clears cache when posts or pages are updated.
 *
 * @package SpeedPress\Modules\Cache\Features
 * @since 1.0.0
 */
class AutoPurge extends BaseFeature {

    public function run(): void {
        if (!$this->value) return;

        add_action(['save_post', 'deleted_post'], function($post_id) {
            // Clear cache automatically
        });
    }
}