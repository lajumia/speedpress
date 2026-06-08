<?php

namespace SpeedPress\Modules\General\Features;

/**
 * Class HeartbeatInEditor
 *
 * Controls the WordPress Heartbeat API interval
 * inside the post editor.
 *
 * @package SpeedPress\Modules\General\Features
 * @since 1.0.0
 */
class HeartbeatInEditor extends BaseFeature
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
     * Modify editor heartbeat interval.
     *
     * @param array $settings Heartbeat settings.
     * @return array
     */
    public function modify_heartbeat_settings(array $settings): array
    {
        if (! is_admin()) {
            return $settings;
        }

        $screen = function_exists('get_current_screen')
            ? get_current_screen()
            : null;

        if (
            ! $screen ||
            ! in_array(
                $screen->base,
                ['post', 'post-new'],
                true
            )
        ) {
            return $settings;
        }

        $allowed_intervals = [15, 60, 120, 300];

        $interval = (int) $this->value;

        if (in_array($interval, $allowed_intervals, true)) {
            $settings['interval'] = $interval;
        }

        return $settings;
    }
}