<?php

namespace SpeedPress\Modules\General\Features;

/**
 * Class HeartbeatInDashboard
 *
 * Controls the WordPress Heartbeat API interval for
 * dashboard, editor and frontend pages.
 *
 * @package SpeedPress\Modules\General\Features
 * @since 1.0.0
 */
class HeartbeatInDashboard extends BaseFeature
{
    /**
     * Register heartbeat filters.
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
     * Modify heartbeat interval.
     *
     * @param array $settings Heartbeat settings.
     * @return array
     */
    public function modify_heartbeat_settings(array $settings): array
    {
        if (is_admin()) {

            $screen = function_exists('get_current_screen')
                ? get_current_screen()
                : null;

            // Post editor
            if (
                $screen &&
                in_array(
                    $screen->base,
                    ['post', 'post-new'],
                    true
                )
            ) {
                $settings['interval'] = (int) $this->value;
            }

            // Dashboard/Admin
            else {
                $settings['interval'] = (int) $this->value;
            }
        }

        return $settings;
    }
}