<?php

namespace SpeedPress\Modules\Cache\Features;

use SpeedPress\Modules\BaseFeature;

/**
 * Class ScheduledPreload
 *
 * Automatically re-warm the cache on a schedule.
 *
 * @package SpeedPress\Modules\Cache\Features
 * @since 1.0.0
 */
class ScheduledPreload extends BaseFeature {

    public function run(): void {
        if (!$this->value['enabled']) return;

        if (!wp_next_scheduled('speedpress_scheduled_preload')) {
            wp_schedule_event(time(), 'hourly', 'speedpress_scheduled_preload');
        }

        add_action('speedpress_scheduled_preload', function() {
            // Preload all cached pages according to settings
        });
    }
}