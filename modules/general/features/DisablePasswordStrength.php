<?php

namespace SpeedPress\Modules\General\Features;

/**
 * Class DisablePasswordStrength
 *
 * Disables the WordPress password strength meter script.
 *
 * @package SpeedPress\Modules\General\Features
 * @since 1.0.0
 */
class DisablePasswordStrength extends BaseFeature
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

        add_action(
            'wp_enqueue_scripts',
            [$this, 'remove_password_strength_meter'],
            999
        );
    }

    /**
     * Remove password strength meter script.
     *
     * @return void
     */
    public function remove_password_strength_meter(): void
    {
        wp_dequeue_script('password-strength-meter');
        wp_deregister_script('password-strength-meter');
    }
}