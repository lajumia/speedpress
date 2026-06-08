<?php

namespace SpeedPress\Modules\General\Features;

/**
 * Class DisableDashicons
 *
 * Disables the Dashicons stylesheet on the frontend for
 * non-logged-in users to reduce unnecessary CSS loading.
 *
 * @package SpeedPress\Modules\General\Features
 * @since 1.0.0
 */
class DisableDashicons extends BaseFeature
{
    /**
     * Register hooks.
     *
     * @return void
     */
    public function run(): void
    {
        if (!$this->value) {
            return;
        }

        add_action('wp_enqueue_scripts', [$this, 'remove_dashicons'], 999);
    }

    /**
     * Remove Dashicons stylesheet from frontend.
     *
     * @return void
     */
    public function remove_dashicons(): void
    {
        if (is_user_logged_in()) {
            return;
        }

        wp_dequeue_style('dashicons');
        wp_deregister_style('dashicons');
    }
}