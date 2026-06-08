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
     * Register hooks.
     *
     * @return void
     */
    public function run(): void
    {
        if ('disable' === $this->value) {
            add_action(
                'wp_enqueue_scripts',
                [$this, 'disable_heartbeat'],
                100
            );
        } else {
            add_filter(
                'heartbeat_settings',
                [$this, 'modify_heartbeat_settings']
            );
        }
    }

    /**
     * Disable Heartbeat API on frontend.
     *
     * @return void
     */
    public function disable_heartbeat(): void
    {
        if (! is_admin()) {
            wp_deregister_script('heartbeat');
        }
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

        $allowed_intervals = [15, 60];

        $interval = (int) $this->value;

        if (in_array($interval, $allowed_intervals, true)) {
            $settings['interval'] = $interval;
        }

        return $settings;
    }
}