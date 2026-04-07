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
class DisablePasswordStrength {

    /**
     * The settings key for this feature.
     *
     * @var string
     */
    protected $key;

    /**
     * Whether this feature is enabled.
     *
     * @var bool
     */
    protected $value;

    /**
     * Constructor
     *
     * @param string $key   The feature key from plugin settings.
     * @param bool   $value Whether this feature is enabled.
     */
    public function __construct($key, $value){
        $this->key = $key;
        $this->value = $value;
    }

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