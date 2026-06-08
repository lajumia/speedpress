<?php

namespace SpeedPress\Modules\General\Features;

/**
 * Class HeartbeatInDashboard
 *
 * Controls the WordPress Heartbeat API interval
 * for dashboard/admin pages only.
 *
 * @package SpeedPress\Modules\General\Features
 * @since 1.0.0
 */
class HeartbeatInDashboard extends BaseFeature
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
                'admin_enqueue_scripts',
                [$this, 'disable_heartbeat']
            );
        } else {
            add_filter(
                'heartbeat_settings',
                [$this, 'modify_heartbeat_settings']
            );
        }
    }

    /**
     * Disable Heartbeat API on dashboard/admin pages
     * excluding the post editor.
     *
     * @return void
     */
    public function disable_heartbeat(): void
    {
        if (! function_exists('get_current_screen')) {
            return;
        }

        $screen = get_current_screen();

        // Keep Heartbeat enabled in the editor for autosaves.
        if (
            $screen &&
            in_array(
                $screen->base,
                ['post', 'post-new'],
                true
            )
        ) {
            return;
        }

        wp_deregister_script('heartbeat');
    }

    /**
     * Modify Heartbeat interval on dashboard/admin pages
     * excluding the post editor.
     *
     * @param array $settings Heartbeat settings.
     * @return array
     */
    public function modify_heartbeat_settings(array $settings): array
    {
        if (! is_admin()) {
            return $settings;
        }

        if (! function_exists('get_current_screen')) {
            return $settings;
        }

        $screen = get_current_screen();

        // Ignore the editor.
        if (
            $screen &&
            in_array(
                $screen->base,
                ['post', 'post-new'],
                true
            )
        ) {
            return $settings;
        }

        $settings['interval'] = (int) $this->value;

        return $settings;
    }
}