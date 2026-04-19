<?php

namespace SpeedPress\Modules\CSS\Features;

/**
 * Class CombineCSS
 *
 * Combines multiple CSS files into a single file to reduce
 * the number of HTTP requests and improve page load speed.
 *
 * Specific CSS handles can be excluded from combination.
 *
 * @package SpeedPress\Modules\CSS\Features
 * @since 1.0.0
 */
class CombineCSS extends BaseFeature {

    /**
     * Run the feature
     *
     * Hooks into WordPress' wp_enqueue_scripts action to
     * merge CSS files if the feature is enabled.
     *
     * @return void
     */
    public function run(): void {
        // Check if feature is enabled
        if (!$this->value['enabled']) return;

        add_action('wp_enqueue_scripts', function() {
            // Implement CSS combination logic here
            // Skip any handles specified in $this->value['exclude'] if needed
        });
    }
}