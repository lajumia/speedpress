<?php

namespace SpeedPress\Modules\General\Features;

/**
 * Class DisablePasswordStrength
 *
 * Disables the WordPress password strength meter script.
 * Useful for performance optimization or when enforcing
 * custom password rules.
 *
 * @package SpeedPress\Modules\General\Features
 * @since 1.0.0
 */
class DisablePasswordStrength extends BaseFeature
{

    /**
     * Run the feature
     *
     * Removes the password strength meter script if the feature is enabled.
     *
     * @return void
     */
    public function run() {
        if ($this->value) {
            wp_dequeue_script('password-strength-meter');
        }
    }
}