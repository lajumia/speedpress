<?php

namespace SpeedPress\Modules\General\Features;

/**
 * Class HeartbeatInFrontend
 *
 * Controls the WordPress Heartbeat API interval
 * on frontend pages.
 *
 * @package SpeedPress\Modules\General\Features
 * @since 1.0.0
 */
class HeartbeatInFrontend extends BaseFeature
{
    /**
     * Register heartbeat filter.
     *
     * @return void
     */
    public function run(): void
    {
        add_filter(
            'heartbeat_settings',
            [$this, 'modify_heartbeat_settings']
        );
    }

    /**
     * Modify frontend heartbeat interval.
     *
     * @param array $settings Heartbeat settings.
     * @return array
     */
    public function modify_heartbeat_settings(array $settings): array
    {
        if (is_admin()) {
            return $settings;
        }

        $settings['interval'] = (int) $this->value;

        return $settings;
    }
}